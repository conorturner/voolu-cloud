import asyncio
import uuid
import functools
import os
import httpx
import json
import ssl

from services.logs import get_logger

TCP_PORT = int(os.environ.get('TCP_PORT', 8080))
LOOKUP_SERVICE_URL = os.environ.get('LOOKUP_SERVICE_URL', None)


async def decode_token(user_token):
    async with httpx.AsyncClient() as client:
        r = await client.post(LOOKUP_SERVICE_URL + '/host-validate', data=json.dumps({'token': user_token}))
        r = r.json()

        if not r['success']:
            raise Exception('Token decode error')

        email = r['email']
        host_tag = r['host_tag']
        return email, host_tag


async def on_host_connect(hosts, clients, writer, reader, connect_request, log):
    user_token = connect_request[3:-1]
    email, host_tag = await decode_token(user_token)

    if email not in hosts:
        hosts[email] = {}
    if host_tag in hosts[email]:
        writer.write(b'HCRE\n')
        await writer.drain()
        return

    hosts[email][host_tag] = writer

    writer.write(b'HCRS\n')
    await writer.drain()

    while True:
        line = await reader.readline()
        if not line:
            break

        command = line[:3]
        session_id = line[3:39].decode()
        body = line[39:]

        if command == b'HBT':
            log.info({'message': 'host heart beat', 'email': email, 'host_tag': host_tag})
            continue

        log.info({'message': 'host sent bytes', 'count': len(body), 'email': email, 'host_tag': host_tag})

        if email in clients:
            if host_tag in clients[email]:
                if session_id in clients[email][host_tag]:
                    clients[email][host_tag][session_id].write(command + body)
                    await clients[email][host_tag][session_id].drain()

    del hosts[email][host_tag]
    writer.close()


async def on_client_connect(reader, hosts, clients, writer, state, client_connect_request, log):
    user_token = client_connect_request[3:-1]
    email, host_tag = await decode_token(user_token)

    if (email not in hosts) or (host_tag not in hosts[email]):
        # if host is not found locally respond and close connection
        writer.write(b'CCR' + b'N\n')
        await writer.drain()
        writer.close()
        return
    else:
        writer.write(b'CCR' + b'F\n')
        await writer.drain()

    log.info({'message': 'client connected to host', 'email': email, 'host_tag': host_tag})

    host_socket = hosts[email][host_tag]
    session_id = str(uuid.uuid4())

    if email not in clients:
        clients[email] = {}

    if host_tag in clients[email]:
        clients[email][host_tag][session_id] = writer
    else:
        clients[email][host_tag] = {session_id: writer}

    while True:
        line = await reader.readline()
        if not line:
            break

        command, body = line[:3], line[3:]

        if command == b'HBT':
            log.info({'message': 'client heart beat', 'email': email, 'host_tag': host_tag, 'session_id': session_id})
            continue

        log.info({'message': 'client sent bytes', 'count': len(body), 'session_id': session_id, 'email': email,
                  'host_tag': host_tag})

        host_socket.write(command + session_id.encode() + body)
        try:
            await host_socket.drain()
        except ConnectionResetError:
            log.info({'message': 'host closed connection', 'email': email, 'host_tag': host_tag})
            del clients[email][host_tag][session_id]
            writer.write(b'CSC\n')
            await writer.drain()
            return

    del clients[email][host_tag][session_id]

    try:
        host_socket.write(b'\nCSC' + session_id.encode() + b'\n')
        await host_socket.drain()
    except ConnectionResetError:
        log.info({'message': 'host closed connection', 'email': email, 'host_tag': host_tag})


async def on_connect(state, reader, writer):
    hosts = state['hosts']
    clients = state['clients']
    remote_ip, _ = writer.get_extra_info('peername')

    log = get_logger({'remote_ip': remote_ip})

    log.info(f"New connection")

    connect_request = (await reader.readline()).decode()

    log.info('connect_request: ' + connect_request)

    if connect_request.startswith('HCQ'):
        await on_host_connect(hosts, clients, writer, reader, connect_request, log)
    elif connect_request.startswith('CCQ'):
        await on_client_connect(reader, hosts, clients, writer, state, connect_request, log)
    elif connect_request.startswith('HLC'):
        writer.write(b'OK\n')
        await writer.drain()
    else:
        log.warn({'message': 'unknown path', 'connect_request': connect_request})

    writer.close()


async def start_tcp(state):
    ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    ssl_context.check_hostname = False
    ssl_context.load_cert_chain('/tmp/vcert.crt', '/tmp/vkey.key')

    server = await asyncio.start_server(functools.partial(on_connect, state), '0.0.0.0', TCP_PORT, ssl=ssl_context)
    addr = server.sockets[0].getsockname()

    print(f'Serving on {addr}')
    async with server:
        await server.serve_forever()
