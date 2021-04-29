import React from "react"
import Style from "./FormInline.module.css"
import classNames from "classnames"


/**
 * A form displayed in a single line.
 *
 * @param children - The contents of the form.
 * @param className - Additional class(es) to pass to the form.
 * @param props - Additional props to pass to the form.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormInline({ children, className, ...props }) {
    return (
        <form className={classNames(Style.FormInline, className)} {...props}>
            {children}
        </form>
    )
}
