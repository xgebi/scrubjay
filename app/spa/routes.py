from operator import and_
from app.spa import spa
#from app import db
from flask import render_template, flash, request, redirect, url_for
from app.settings.models import Setting

@spa.route('/')
def display_spa():
  configured = Setting.query.get('configured')
  return render_template('index.html', configured=configured)
