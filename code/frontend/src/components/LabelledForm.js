import React from "react"
import Style from "./LabelledForm.module.css"
import classNames from "classnames"


/**
 * A form with two columns: the leftmost one contains labels, while the rightmost one contains input elements.
 *
 * The {@link Label} element can be used to quickly generate labelled input elements.
 *
 * @param children - The contents of the form.
 * @param className - Additional class(es) to be added to the form.
 * @param props - Additional props to be passed to the form.
 * @returns {JSX.Element}
 * @constructor
 */
export default function LabelledForm({ children, className, ...props }) {
    return (
        <form className={classNames(Style.LabelledForm, className)} {...props}>
            {children}
        </form>
    )
}
