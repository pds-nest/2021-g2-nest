"""
Page that displays a message if the server is on
"""

from flask import render_template, abort, jsonify, request
from ..database import *


def page_doa():
    utente = User()
    if request.method == "GET":
        return "Get"
    return "If you see this, the server is fine."
