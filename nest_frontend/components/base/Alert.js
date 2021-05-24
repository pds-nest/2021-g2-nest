import React from "react"
import Style from "./Alert.module.css"
import classNames from "classnames"


/**
 * A colored alert box to draw the user's attention.
 *
 * @param color - The color of the alert.
 * @param children - The contents of the alert.
 * @param className - Additional class(es) to add to the div.
 * @param props - Additional props to pass to the div.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Alert({ color, children, className, ...props }) {
    return (
        <div className={classNames(Style.BoxAlert, Style[`BoxAlert${color}`], className)} {...props}>
            {children}
        </div>
    )
}
