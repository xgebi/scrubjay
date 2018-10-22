from flask import Blueprint
spa = Blueprint('spa', __name__, template_folder='templates')

from app.spa import routes