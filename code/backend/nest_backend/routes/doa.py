"""
Page that displays a message if the server is on
"""

from flask import render_template, abort
from ..database import *




def page_doa():
    utente = Utente()
    return "If you see this, the server is fine."
