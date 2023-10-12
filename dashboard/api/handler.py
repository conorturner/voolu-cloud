from lambdarest import lambda_handler

from functools import partial
from services.routing import route
from services.logs import setup_logging

route = partial(route, base='/api')

setup_logging()


@route("get", path='/health')
def health(_):
    return {"success": True}
