from nest_backend.app import app
from nest_backend.database import *

Base.init_app(app=app)


def start_exploring():
    pass  # Codice qui


if __name__ == "__main__":
    with app.app_context():
        Base.create_all(app=app)
        start_exploring()
