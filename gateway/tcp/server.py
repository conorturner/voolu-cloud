import asyncio

from services.ssl import cert_gen
from services.tcp import start_tcp
from services.discovery import join_cluster


async def main():
    state = {
        'hosts': {},
        'clients': {},
        'replicas': []
    }

    cert, key = cert_gen()

    loop = asyncio.get_running_loop()
    loop.create_task(join_cluster(cert))

    await start_tcp(state)  # blocks


if __name__ == '__main__':
    asyncio.run(main())
