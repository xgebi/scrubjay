# SPA init file
# version 0.0.1
# author Sarah Gebauer

from flask import Blueprint
spa = Blueprint('spa', __name__, template_folder='templates')

from app.spa import routes