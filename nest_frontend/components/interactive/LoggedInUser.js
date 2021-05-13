import React, { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import ContextUser from "../../contexts/ContextUser"


/**
 * An element displaying inline the currently logged in user.
 *
 * @param props - Additional props to pass to the element.
 * @returns {JSX.Element}
 * @constructor
 */
export default function LoggedInUser({ ...props }) {
    const { user } = useContext(ContextUser)

    if(!user) {
        return (
            <i {...props}>
                Non acceduto
            </i>
        )
    }

    return (
        <b {...props}>
            <FontAwesomeIcon icon={faUser}/> {user.username}
        </b>
    )
}
