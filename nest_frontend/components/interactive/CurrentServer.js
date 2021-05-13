import React, { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"
import ContextServer from "../../contexts/ContextServer"


/**
 * An element displaying inline the current backend server.
 *
 * @param props - Additional props to pass to the element.
 * @returns {JSX.Element}
 * @constructor
 */
export default function CurrentServer({ ...props }) {
    const { server } = useContext(ContextServer)

    return (
        <b {...props}>
            <FontAwesomeIcon icon={faGlobe}/> {server}
        </b>
    )
}
