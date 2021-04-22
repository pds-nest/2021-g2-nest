"""
Page that displays a message if the server is on
"""

from flask import render_template, abort, jsonify, request
from ..database import *


def page_doa():
    """
    Dead or Alive page. If a client sees this, the server is probably fine.
    :return: A friendly and calming message, that makes you happy that the server is not on fire.
    """
    if request.method == "GET":
        return "If you see this, the server is fine."
    return "Hello there."
