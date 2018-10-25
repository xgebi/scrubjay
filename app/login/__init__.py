import json
from flask import Blueprint
from flask_restful import reqparse, abort, Api, Resource
from app.login.models import User

class UserLogin(Resource):
  def post(self):
    return "{ login: [] }"
