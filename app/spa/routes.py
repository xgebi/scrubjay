from app.spa import spa
from app import db
from flask import render_template, flash, request, redirect, url_for


@spa.route('/', methods = ['GET'])
def display_spa():
    return render_template('index.html')
