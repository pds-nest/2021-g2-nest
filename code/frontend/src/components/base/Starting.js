import React from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


/**
 * A div with a static dots icon and a "Starting..." text.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Starting() {
    return (
        <div>
            <FontAwesomeIcon icon={faSpinner}/> Starting...
        </div>
    )
}
