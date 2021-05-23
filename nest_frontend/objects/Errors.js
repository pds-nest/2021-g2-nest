/**
 * Error thrown when a function is not implemented in the current class/instance.
 */
class NotImplementedError {
    name

    constructor(name) {
        this.name = name
    }
}


/**
 * An error in the N.E.S.T. frontend-backend communication.
 */
class BackendCommunicationError {

}


/**
 * Error thrown when trying to access a backend view which doesn't exist or isn't allowed in the used hook.
 */
class ViewNotAllowedError extends BackendCommunicationError {
    view

    constructor(view) {
        super()

        this.view = view
    }
}


/**
 * Error thrown when trying to access a backend view when outside a {@link ContextServer}.
 */
class ServerNotConfiguredError extends BackendCommunicationError {

}


/**
 * Error thrown when trying to access a backend view while another access is ongoing.
 *
 * This is not allowed due to potential race conditions.
 */
class FetchAlreadyRunningError extends BackendCommunicationError {

}


/**
 * Abstract class for {@link DecodeError} and {@link ResultError}.
 */
class FetchError extends BackendCommunicationError {
    status
    statusText

    constructor(status, statusText) {
        super()

        this.status = status
        this.statusText = statusText
    }
}


/**
 * Error thrown when the frontend can't parse the data received from the backend.
 */
class DecodeError extends FetchError {
    error

    constructor(status, statusText, error) {
        super(status, statusText)

        this.error = error
    }
}


/**
 * Error thrown when the backend returns a falsy `"result"` value.
 */
class ResultError extends FetchError {
    status
    statusText
    data

    constructor(status, statusText, data) {
        super(status, statusText)

        this.data = data
    }

    getMsg() {
        return this.data.msg
    }

    getCode() {
        return this.data.code
    }
}