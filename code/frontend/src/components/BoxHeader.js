import React from "react"
import Style from "./BoxHeader.module.css"
import classNames from "classnames"


/**
 * A box with only the header part and with no body.
 *
 * @param children - What should be displayed inside the header.
 * @param className - Additional class(es) that should be added to the box.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxHeader({ children, className, ...props }) {
    return (
        <div className={classNames(Style.BoxHeaderOnly, className)} {...props}>
            {children}
        </div>
    )
}
