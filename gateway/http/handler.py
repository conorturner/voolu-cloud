import jwt
from lambdarest import lambda_handler
import json
import boto3
import os
import bcrypt

from services.auth import create_jwt, decode_jwt
from services.routing import route
from services.logs import setup_logging

setup_logging()

REPLICA_BUCKET = os.environ.get('REPLICA_BUCKET')
AUTH_BUCKET = os.environ.get('AUTH_BUCKET')
JWT_SECRET = os.environ.get('JWT_SECRET')

s3 = boto3.client('s3')


@route("get", path='/health')
def health(_):
    return {"success": True}


@route("get", path='/replicas')
def get_replicas(event):
    source_ip = event['requestContext']['identity']['sourceIp']
    objects = s3.list_objects(Bucket=REPLICA_BUCKET)

    replicas = [c['Key'] for c in objects['Contents']] if 'Contents' in objects else []

    return {
        'statusCode': 200,
        'body': json.dumps({'source_ip': source_ip, 'replicas': replicas})
    }


@route("get", path='/replicas/<string:replica>/cert')
def get_cert(event, replica):
    source_ip = event['requestContext']['identity']['sourceIp']

    try:
        cert = s3.get_object(Bucket=REPLICA_BUCKET, Key=replica)
        cert = cert['Body'].read()

        return {
            'statusCode': 200,
            'body': json.dumps({'source_ip': source_ip, 'replica': replica, 'cert': cert.decode()})
        }
    except s3.exceptions.NoSuchKey:
        return {
            'statusCode': 404
        }


@route("post", path='/create-account')
def create_account(event):
    body = json.loads(event['body'])

    if 'email' not in body or 'password' not in body:
        return {
            'statusCode': 400,
            'body': "email and password must be included in body"
        }

    try:
        s3.get_object(Bucket=AUTH_BUCKET, Key=body['email'])
        return {
            'statusCode': 409,
            'body': json.dumps({'msg': 'email in use'})
        }
    except s3.exceptions.NoSuchKey:
        print('')
        hashed = bcrypt.hashpw(body['password'].encode(), bcrypt.gensalt())
        s3.put_object(Bucket=AUTH_BUCKET, Key=body['email'], Body=hashed)

        return {
            'statusCode': 200,
            'body': json.dumps({'success': True})
        }


@route("post", path='/login')
def login(event):
    body = json.loads(event['body'])

    if 'email' not in body or 'password' not in body:
        return {
            'statusCode': 400,
            'body': "email and password must be included in body"
        }

    try:
        hashed = s3.get_object(Bucket=AUTH_BUCKET, Key=body['email'])
        hashed = hashed['Body'].read()

        if bcrypt.checkpw(body['password'].encode(), hashed):
            return {
                'statusCode': 200,
                'body': json.dumps({'token': create_jwt({
                    'email': body['email'], 'max_connections': 10}, secret=JWT_SECRET)})
            }
        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'msg': 'login error'})
            }
    except s3.exceptions.NoSuchKey:
        return {
            'statusCode': 400,
            'body': json.dumps({'msg': 'login error'})
        }


@route("post", path='/host-connect')
def host_connect(event):
    body = json.loads(event['body'])

    if 'token' not in body or 'tag' not in body:
        return {
            'statusCode': 400,
            'body': "token and tag must be included in body"
        }

    try:
        content = decode_jwt(body['token'], secret=JWT_SECRET)
    except jwt.exceptions.InvalidSignatureError:
        return {
            'statusCode': 401,
            'body': json.dumps({"success": False, 'error': 'InvalidSignatureError'})
        }

    print(content['max_connections'])

    # TODO: check this does not exceed the host limit

    return {
        'statusCode': 200,
        'body': json.dumps({
            "success": True,
            'host_token': create_jwt({'host_tag': body['tag'], 'email': content['email']}, secret=JWT_SECRET)})
    }


@route("post", path='/host-validate')
def host_validate(event):
    body = json.loads(event['body'])

    if 'token' not in body:
        return {
            'statusCode': 400,
            'body': "token must be included in body"
        }

    try:
        content = decode_jwt(body['token'], secret=JWT_SECRET)
        content['success'] = True
        return {
            'statusCode': 200,
            'body': json.dumps(content)
        }
    except jwt.exceptions.InvalidSignatureError:
        return {
            'statusCode': 401,
            'body': json.dumps({"success": False, 'error': 'InvalidSignatureError'})
        }
