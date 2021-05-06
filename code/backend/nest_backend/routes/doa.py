"""
Page that displays a message if the server is on
"""

from flask import render_template, abort, jsonify, request
from nest_backend.database import *


def page_doa():
    """
    ---
    get:
        description: Test endpoint. If this page works, the server is fine.
        tags:
            - debug
    """
    if request.method == "GET":
        return "If you see this, the server is fine."
    return "Hello there."
