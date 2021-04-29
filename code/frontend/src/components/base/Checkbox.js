import React from "react"
import Style from "./Checkbox.module.css"
import classNames from "classnames"


/**
 * A checkbox.
 *
 * @param className - Additional class(es) to add to the checkbox.
 * @param props - Additional props to pass to the checkbox.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Checkbox({ className, ...props }) {
    return (
        <input type={"checkbox"} className={classNames(Style.Checkbox, className)} {...props} />
    )
}
