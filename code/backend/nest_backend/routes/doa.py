from flask import render_template, abort
from ..database import *

"""
Page that displays a message if the server is on
"""


def page_doa():
    utente = Utente()
    return "If you see this, the server is fine."
