# User errors
USER_NOT_FOUND = "errorUserNotFound"  # Could not find user
USER_WRONG_CREDENTIALS = "errorUserWrongCredentials"  # User has given incorrect pair of credentials
USER_NOT_AUTHORIZED = "errorUserNotAuthorized"  # User is not authorized to proceed
USER_NOT_ADMIN = "errorUserNotAdmin"  # User is not an admin
USER_PREVENT_SEPPUKU = "errorUserPreventSeppuku"  # User cannot delete himself
USER_DELETION_ERROR = "errorDeletionError"  # Something is preventing the deletion of the user
# Generic
GENERIC_NOT_FOUND = "errorNotFound"  # Generic 404
GENERIC_MISSING_FIELDS = "errorMissingFields"  # Generic 400
GENERIC_ALREADY_EXISTS = "errorAlreadyExists"  # Generic primary key error
GENERIC_ENUM_INVALID = "errorEnumInvalid"  # The given integer is not a valid one
GENERIC_UFO = "errorUnknownError"  # The classic 'the hell is this' error
GENERIC_NO_JSON = "errorNoJson"  # No JSON was given
# Repository
REPOSITORY_NOT_FOUND = "errorRepositoryNotFound"  # Repository not found
REPOSITORY_NOT_OWNER = "errorRepositoryNotOwner"  # The user is not the repository owner
REPOSITORY_DEPENDENCY_FAILURE = "errorRepositoryDepencencyFailure"  # Something is preventing the repo to go away
# Conditions
CONDITION_NOT_FOUND = "errorConditionNotFound"  # Condition not found.
# Alerts
ALERT_NOT_FOUND = "errorAlertNotFound"  # Alert not found
ALERT_NO_NAME = "errorAlertNoName"  # Missing name entry
ALERT_NO_LIMIT = "errorAlertNoLimit"  # Missing limit entry
ALERT_NO_WINDOW = "errorAlertNoWindow"  # Missing window entry
ALERT_NO_EVALUATION = "errorAlertNoEvaluation"  # Missing evalmode entry
ALERT_DELETION_FAILURE = "errorAlertDeletionFailure"  # Error while deleting alerts
# Authorization
AUTHORIZATION_NOT_FOUND = "errorAuthorizationNotFound"  # Authorization not found
