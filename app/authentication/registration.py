from flask_restful import reqparse, abort, Api, Resource
from app.authentication.models import User

class Registration(Resource):
  def post(self):
    user = User.query.get()

    return "{ login: [] }"