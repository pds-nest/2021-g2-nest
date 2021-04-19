from flask import render_template, abort
from ..database.tables.Utente import Utente

"""
Page that displays a message if the server is on
"""

def page():
    return "If you see this, the server is fine."
