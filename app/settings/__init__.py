import json
from flask import Blueprint
from flask_restful import reqparse, abort, Api, Resource
from app.settings.models import Setting

class Settings(Resource):
  def get(self):
    settings = Setting.query.all()
    if (len(settings) == 0):
      return "{ settings: [] }"
    return json.dump(settings)

  def put(self, updated_settings):
    old_settings = Settings.query.all()
    new_settings = json.JSONDecoder.decode(updated_settings)
    for attr, value in new_settings.__dict__.items():
      print(attr, value)
    return "{ error: true }", 201


