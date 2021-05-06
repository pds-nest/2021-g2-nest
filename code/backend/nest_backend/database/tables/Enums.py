"""
This module contains the main enum definitions.
"""

import enum


class ConditionType(enum.Enum):
    """
    Vedi `Specifica delle Conditions su
    GitLab <https://gitlab.steffo.eu/nest/g2-progetto/-/wikis/Specifica-delle-Conditions>`_ .
    """

    hashtag = 0
    location = 1
    time = 2
    coordinates = 3
    place = 4


class OperationType(enum.Enum):
    _and = 0
    _or = 1
    _not = 2
    assign = 3


class ConditionMode(enum.Enum):
    all_or = 0
    all_and = 1
