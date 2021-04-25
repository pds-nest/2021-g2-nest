import React, { useContext } from "react"
import Style from "./LoggedInUser.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import ContextLogin from "../contexts/ContextLogin"


export default function LoggedInUser({ children, className, ...props }) {
    const {state} = useContext(ContextLogin);

    if(!state) {
        return (
            <i className={classNames(Style.LoggedInUser, className)} {...props}>
                Not logged in
            </i>
        )
    }

    return (
        <b className={classNames(Style.LoggedInUser, className)} {...props}>
            <FontAwesomeIcon icon={faUser}/> {state.username}
        </b>
    )
}
