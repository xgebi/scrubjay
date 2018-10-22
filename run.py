from app import create_app, db
from sqlalchemy import exc

flask_app = create_app('dev')
with flask_app.app_context():
    db.create_all()
