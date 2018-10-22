from app.settings import settings
from app import db
from app.settings.models import Setting
from app.authentication import *
from flask import render_template, flash, request, redirect, url_for

