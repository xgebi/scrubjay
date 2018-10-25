from app import db

class User(db.Model):
  __tablename__ = 'scrubjay_users'

  username = db.Column(db.String(50), primary_key=True)
  password = db.Column(db.String(500), nullable=True)
  display_name = db.Column(db.String(50))
  current_session_uid = db.Column(db.String(50))

  def __init__(self, username, password, display_name, current_session_uid):
    self.username = username
    self.password = password
    self.display_name = display_name
    self.current_session_uid = current_session_uid
