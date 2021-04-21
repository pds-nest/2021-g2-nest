"""
This module contains the main enum definitions.
"""

import enum


class ConditionType(enum.Enum):
    hashtag = 0
    location = 1
    time = 2


class OperationType(enum.Enum):
    _and = 0
    _or = 1
    _not = 2
    assign = 3
