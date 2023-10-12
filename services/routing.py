from functools import wraps
from lambdarest import lambda_handler
import logging


@wraps(lambda_handler.handle)
def route(*args, **kwargs):
    """Wraps handle function to add proxy base path and route aware logger"""
    handle = lambda_handler.handle(*args, **kwargs)

    @wraps(handle)
    def route_wrapper(handler_func):
        @wraps(handler_func)
        def handle_wrapper(*args3, **kwargs3):
            request_id = args3[0]['requestContext']['requestId']
            source_ip = args3[0]['requestContext']['identity']['sourceIp']

            logger = logging.getLogger()
            logger = logging.LoggerAdapter(logger, {'path': kwargs['path'], 'request_id': request_id})

            args3[0]['logger'] = logger

            logger.info(f'request {source_ip}')
            response = handler_func(*args3, **kwargs3)
            logger.info('response')
            return response

        route_handler_function = handle(handle_wrapper)
        return route_handler_function

    return route_wrapper
