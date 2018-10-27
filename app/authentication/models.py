from app import db

class User(db.Model):
  __tablename__ = 'scrubjay_users'

  username = db.Column(db.String(50), primary_key=True)
  password = db.Column(db.String(500), nullable=True)
  display_name = db.Column(db.String(50))
  current_session_uid = db.Column(db.String(50))
  cookie_session_uid = db.Column(db.String(50))
  last_active_timedate = db.Column(db.DateTime)
  email = db.Column(db.String(360))



  def __init__(self, username, password, display_name, email, current_session_uid, cookie_session_uid):
    self.username = username
    self.password = password
    self.display_name = display_name
    self.email = email
    self.current_session_uid = current_session_uid
    self.cookie_session_uid = cookie_session_uid
