# app/__init__.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app(config_type):
  app = Flask(__name__)
  app = Flask(__name__)
  configuration = os.path.join(os.getcwd(), 'config', config_type + '.py')
  # C:\\Users\\dell\\PycharmProjects\\book_catalog\\config\\dev.py
  app.config.from_pyfile(configuration)
  db.init_app(app)  # initialize database

  from app.spa import spa  # import blueprint
  app.register_blueprint(spa)  # register blueprint

  from app.settings import settings  # import blueprint
  app.register_blueprint(settings)  # register blueprint

  return app
  
