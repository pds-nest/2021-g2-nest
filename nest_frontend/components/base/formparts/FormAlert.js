import React from "react"
import Style from "./FormAlert.module.css"
import classNames from "classnames"
import Alert from "../Alert"


/**
 * A {@link Alert} ready to be used in a {@link FormLabelled}.
 *
 * @param children - The contents of the alert.
 * @param className - Additional class(es) to add to the box.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormAlert({ children, className, ...props }) {
    return (
        <Alert className={classNames(Style.FormAlert, className)} {...props}>
            {children}
        </Alert>
    )
}
