import json
import boto3
import os
import asyncio
import ssl

REPLICA_BUCKET = os.environ.get('REPLICA_BUCKET')
s3 = boto3.client('s3')


async def health_check(ip_addr, cert, port=222):
    ssl_context = ssl.create_default_context(ssl.Purpose.SERVER_AUTH)
    ssl_context.check_hostname = False
    ssl_context.load_verify_locations(cadata=cert)
    reader, writer = await asyncio.open_connection(ip_addr, port, ssl=ssl_context, ssl_handshake_timeout=10)

    writer.write(b'HLC\n')
    await writer.drain()

    resp = await reader.readline()

    return resp.startswith(b'OK')


def handle(event, context):
    for record in event['Records']:
        body = json.loads(record['body'])
        ip_addr = body['ip_addr']
        cert = body['cert']

        loop = asyncio.get_event_loop()
        is_healthy = loop.run_until_complete(health_check(ip_addr, cert))

        if is_healthy:
            s3.put_object(Bucket=REPLICA_BUCKET, Key=ip_addr, Body=cert.encode())
        else:
            s3.delete_object(Bucket=REPLICA_BUCKET, Key=ip_addr)
