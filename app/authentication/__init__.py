import json
from flask import Blueprint
from flask_restful import reqparse, abort, Api, Resource
from app.authentication.models import User

class Authentication(Resource):
  def post(self):
    user = User.query.get()
    
    return "{ login: [] }"

  def create_session(username):
    return false
  
  def verify_session(username, session_id):
    return false
