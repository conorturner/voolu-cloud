from datetime import datetime

import jwt
from functools import wraps

JWT_SECRET = 'not secret'


def create_jwt(payload, secret=JWT_SECRET, exp=None):
    if exp:
        payload['exp'] = exp

    return jwt.encode(payload, secret, algorithm='HS256')


def decode_jwt(payload, secret=JWT_SECRET):
    return jwt.decode(payload, secret, algorithms='HS256')


def sess_auth(handler, no_sess_response=({'session': False}, 401, {})):
    @wraps(handler)
    def wrapped(*args, **kwargs):
        event = args[0]

        # No need to auth WebSockets once they are connected
        if 'eventType' in event['requestContext'] and event['requestContext']['eventType'] == 'MESSAGE':
            return handler(*args, **kwargs)

        if 'session-token' in event['headers']:
            try:
                event['session'] = decode_jwt(event['headers']['session-token'])
            except jwt.exceptions.InvalidSignatureError:
                return no_sess_response
            except jwt.exceptions.ExpiredSignatureError:
                return no_sess_response

            return handler(*args, **kwargs)
        else:
            return no_sess_response

    return wrapped
