import React from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export default function Loading({ ...props }) {
    return (
        <div {...props}>
            <FontAwesomeIcon icon={faSpinner} pulse={true}/> Loading...
        </div>
    )
}
