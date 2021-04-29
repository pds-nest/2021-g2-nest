import React from "react"
import Style from "./FormLabelled.module.css"
import classNames from "classnames"


/**
 * A form with two columns: the leftmost one contains labels, while the rightmost one contains input elements.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormLabelled({ children, className, ...props }) {
    return (
        <form className={classNames(Style.LabelledForm, className)} {...props}>
            {children}
        </form>
    )
}
