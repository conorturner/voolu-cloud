import boto3
import os
import urllib.request
import json
import asyncio

from services.logs import get_logger

LOOKUP_SERVICE_URL = os.environ.get('LOOKUP_SERVICE_URL', None)
IP_ADDR = os.environ.get('IP_ADDR', None)
HEARTBEAT_Q_NAME = os.environ.get('HEARTBEAT_Q_NAME', None)


def mk_msg(mid, obj, delay):
    return {
        'Id': str(mid),
        'MessageBody': json.dumps(obj),
        'DelaySeconds': delay,
    }


def get_public_address():
    if IP_ADDR:
        return IP_ADDR

    source_ip = json.loads(urllib.request.urlopen(LOOKUP_SERVICE_URL + '/replicas').read())['source_ip']
    return source_ip


async def join_cluster(cert: str):
    log = get_logger({})

    print(cert)

    if IP_ADDR:
        log.info(f'IP_ADDR provided {IP_ADDR}, not doing lookup.')
        return

    sqs = boto3.resource('sqs')

    while True:
        try:
            queue = sqs.get_queue_by_name(QueueName=HEARTBEAT_Q_NAME)

            source_ip = get_public_address()

            queue.send_messages(
                Entries=[
                    mk_msg(1, {'ip_addr': source_ip, 'cert': cert}, 10),
                ]
            )
        except:
            log.error({'message': 'error getting or writing source_ip', 'url': LOOKUP_SERVICE_URL})

        await asyncio.sleep(10)
