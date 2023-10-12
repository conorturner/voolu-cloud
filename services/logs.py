import logging
from pythonjsonlogger import jsonlogger


def setup_logging(log_level=logging.INFO):
    logger = logging.getLogger()

    # Testing showed lambda sets up one default handler. If there are more,
    # something has changed and we want to fail so an operator can investigate.
    # assert len(logger.handlers) == 1

    logger.setLevel(log_level)
    json_handler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter(
        fmt='%(levelname)s %(message)s'
    )
    json_handler.setFormatter(formatter)
    logger.addHandler(json_handler)
    logger.removeHandler(logger.handlers[0])
    return logger


def get_logger(extra):
    logging.basicConfig(level=logging.INFO)
    log = logging.getLogger()
    logHandler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter(fmt='%(asctime)-15s %(levelname)s %(message)s %(pathname)s %(lineno)s')
    logHandler.setFormatter(formatter)
    log.addHandler(logHandler)
    log.removeHandler(log.handlers[0])  # this is strange
    log = logging.LoggerAdapter(log, extra)
    return log
