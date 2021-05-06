"""
Page that displays a message if the server is on
"""

from flask import render_template, abort, jsonify, request
from nest_backend.database import *


def page_doa():
    if request.method == "GET":
        return "If you see this, the server is fine."
    return "Hello there."
