from flask_restful import reqparse, abort, Api, Resource
from sqlalchemy.exc import InvalidRequestError
from passlib.hash import bcrypt_sha256

from app.authentication.models import User
from app import db

class Registration(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('username')
    parser.add_argument('password')
    parser.add_argument('email')
    parser.add_argument('displayName')
    parser.add_argument('permissions')
    args = parser.parse_args()

    test_user = User.query.get(args.username)
    if (test_user is not None):
      return "{'registrationError': true, 'userExists': true}"

    password = bcrypt_sha256.hash(args.password)
    try:
      user = User(args.username, password, args.display_name,
                  args.email, None, None, args.permissions)
      db.session.add(user)
      db.session.commit()
    except InvalidRequestError:
      return "{'registrationError': true, 'databaseError': true}"

    return "{'registrationError': false}"
