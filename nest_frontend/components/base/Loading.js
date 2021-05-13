import React from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


/**
 * A div with a spinning dots icon and a "Loading..." text.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Loading() {
    return (
        <div>
            <FontAwesomeIcon icon={faSpinner} pulse={true}/> Loading...
        </div>
    )
}
