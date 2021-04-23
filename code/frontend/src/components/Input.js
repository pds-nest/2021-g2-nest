import React from "react"
import Style from "./Input.module.css"
import classNames from "classnames"


/**
 * A single-line box where the user can enter text.
 *
 * @param className - Additional class(es) to add to the element.
 * @param props - Additional props to pass to the element.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Input({ className, ...props }) {
    return (
        <input className={classNames(Style.Input, className)} {...props} />
    )
}
