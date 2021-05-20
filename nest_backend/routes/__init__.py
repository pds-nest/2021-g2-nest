"""
This module imports all the routes that return something to the frontend.
"""

from .doa import page_doa
from .users import *
from .repository import *

__all__ = ["page_alert", "page_repository_alerts", "page_repository", "page_doa",
           "page_condition", "page_repository_conditions", "page_repositories",
           "page_login", "page_user", "page_users", "page_authorization", "page_repository_authorizations",
           "page_repository_tweets"]
