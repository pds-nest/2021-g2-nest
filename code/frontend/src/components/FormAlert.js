import React from "react"
import Style from "./FormAlert.module.css"
import classNames from "classnames"
import BoxAlert from "./BoxAlert"


/**
 * A {@link BoxAlert} ready to be used in a {@link FormLabelled}.
 *
 * @param children - The contents of the alert.
 * @param className - Additional class(es) to add to the box.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormAlert({ children, className, ...props }) {
    return (
        <BoxAlert className={classNames(Style.FormAlert, className)} {...props}>
            {children}
        </BoxAlert>
    )
}
