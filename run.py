from app import createApp, db
from sqlalchemy import exc

flaskApp = create_app('dev')

if __name__ == '__main__':
    app.run()



with flask_app.app_context():
    db.create_all()
    try:
        if not User.query.filter_by(user_name='harry').first():
            User.create_user(user='harry', email='harry@potters.com', password='secret')
    except exc.IntegrityError:
            flask_app.run()