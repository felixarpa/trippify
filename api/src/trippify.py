import connexion

from flask_cors import CORS

from src.util import log


connexion_app = connexion.FlaskApp(__name__, specification_dir='./openapi/')
flask_app = connexion_app.app
flask_app.config['JSON_AS_ASCII'] = False  # needed for proper UTF-8 support
connexion_app.add_api('openapi.yaml', arguments={'title': 'Trippify API'})

CORS(flask_app)


@flask_app.teardown_appcontext
def shutdown_session(exception=None):
    log.debug('Session removed: {}'.format(exception))
    # TODO Close db session


@flask_app.route('/')
def alive_check():
    return "Welcome to Trippify API!", 200
