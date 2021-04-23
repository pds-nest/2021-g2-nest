import React from "react"
import Style from "./Select.module.css"
import classNames from "classnames"


/**
 * A dropdown list.
 *
 * @param children - The contents of the dropdown list, which usually should be `<option>` or `<optgroup>` elements.
 * @param className - Additional class(es) to add to the element.
 * @param props - Additional props to pass to the element.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Select({ children, className, ...props }) {
    return (
        <select className={classNames(Style.Select, className)} {...props}>
            {children}
        </select>
    )
}
