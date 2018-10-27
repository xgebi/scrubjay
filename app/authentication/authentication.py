from flask_restful import reqparse, abort, Api, Resource
from app.authentication.models import User

class Authentication(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('username')
    parser.add_argument('password')
    args = parser.parse_args()

    user = User.query.get(args.username)
    if (user):
      return "{ 'loginError': 'false' }"

    return "{ 'loginError': true }"

  def create_session(username):
    return false

  def verify_session(username, session_id):
    return false
