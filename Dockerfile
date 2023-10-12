FROM python:3.8.9-alpine3.13

WORKDIR /usr/src

RUN apk add --no-cache build-base libffi-dev rust cargo libressl-dev musl-dev

RUN pip install --no-cache-dir boto3 httpx python-json-logger cryptography pyopenssl

COPY gateway/tcp .
COPY services ./services

CMD ["python", "server.py"]