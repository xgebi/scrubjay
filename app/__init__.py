# app/__init__.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

@app.route("/")
def helloWorld():
  return render_template('index.html')
  

if __name__ == '__main__':
  app.run(debug=True)