from uuid import uuid4
from flask_restful import reqparse, abort, Api, Resource
from passlib.hash import bcrypt_sha256
from datetime import datetime

from app.authentication.models import User
from app import db

class Authentication(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('username')
    parser.add_argument('password')
    args = parser.parse_args()

    user = User.query.get(args.username)
    if (user is not None and bcrypt_sha256.verify(args.password, user.password)):
      user.current_session_uid = uuid4()
      user.last_active_timedate = datetime.now()
      try:      
        db.session.commit()
      except InvalidRequestError:
        return {'loginError': true, 'databaseError': true}, 401
      return {'loginError': 'false'}, 200, {'Authorization': '"Custom ' + user.username + ' ' + user.current_session_uid+'"'}
    else:
      return { 'loginError': true, 'invalidCredentials': true }, 401

    return { 'loginError': true }, 401

  def verify_session(username, session_id):
    return false
