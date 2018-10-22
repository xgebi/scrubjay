from app import db

class Setting(db.Model):
  __tablename__ = 'scrubjay_settings'

  settings_name = db.Column(db.String(100), primary_key=True)
  settings_value = db.Column(db.String(500), nullable=True)

  def __init__(self, settings_name, settings_value):
    self.settings_name = settings_name
    self.settings_value = settings_value
