import React from "react"
import Style from "./Radio.module.css"
import classNames from "classnames"

/**
 * A radio button.
 *
 * @param className - Additional class(es) to add to the checkbox.
 * @param props - Additional props to pass to the checkbox.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Radio({ className, ...props }) {
    return (
        <input type={"radio"} className={classNames(Style.Radio, className)} {...props} />
    )
}
