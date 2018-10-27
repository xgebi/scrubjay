from operator import and_
from app.spa import spa
#from app import db
from flask import render_template, flash, request, redirect, url_for
from app.settings.models import Setting

@spa.route('/')
def display_spa():
  configured = Setting.query.get('configured')
  if (configured is not None and configured.settings_value):
    return render_template('index.html', configured=configured)
  else:
    return render_template('configure.html')

@spa.route('/register')
def registration():
  configured = Setting.query.get('registration_allowed')
  return render_template('register.html')
