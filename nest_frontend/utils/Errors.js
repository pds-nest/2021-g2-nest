class NestError {

}


class ViewNotAllowedError extends NestError {
    view

    constructor(view) {
        super()

        this.view = view
    }
}


class ServerNotConfiguredError extends NestError {

}


class FetchAlreadyRunningError extends NestError {

}


class FetchError extends NestError {
    status
    statusText

    constructor(status, statusText) {
        super()

        this.status = status
        this.statusText = statusText
    }
}


class DecodeError extends FetchError {
    error

    constructor(status, statusText, error) {
        super(status, statusText)

        this.error = error
    }
}


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
