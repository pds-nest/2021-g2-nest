import React from "react"
import Style from "./Empty.module.css"
import classNames from "classnames"
import useStrings from "../../hooks/useStrings"


/**
 * A simple inline `<i>` element to be used when there is nothing to be displayed inside a box.
 *
 * @param className - Additional class(es) to append to the element.
 * @param props - Additional props to pass to the element.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Empty({ className, ...props }) {
    const strings = useStrings()

    return (
        <i className={classNames(Style.Empty, className)} {...props}>
            {strings.emptyMenu}
        </i>
    )
}
