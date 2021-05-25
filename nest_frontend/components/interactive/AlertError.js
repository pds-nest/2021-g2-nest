import React, { useMemo } from "react"
import Alert from "../base/Alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import {
    DecodeError,
    ResultError,
    SerializationError,
    ServerNotConfiguredError,
    ViewNotAllowedError,
} from "../../objects/Errors"
import useStrings from "../../hooks/useStrings"


export default function AlertError({ error, ...props }) {
    const strings = useStrings()

    const content = useMemo(
        () => {
            if(error instanceof ViewNotAllowedError) {
                return strings.errorViewNotAllowed
            }
            else if(error instanceof ServerNotConfiguredError) {
                return strings.errorServerNotConfigured
            }
            else if(error instanceof DecodeError) {
                return strings.errorDecodeError
            }
            else if(error instanceof ResultError) {
                return strings[error.getCode()]
            }
            else if(error instanceof SerializationError) {
                return strings.errorSerializationError
            }
            else {
                return error.toString()
            }
        },
        [strings, error]
    )

    return (
        <Alert color={"Red"} {...props}>
            <FontAwesomeIcon icon={faExclamationTriangle}/> {content}
        </Alert>
    )
}
