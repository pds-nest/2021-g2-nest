import React from "react"
import Style from "./BoxFull.module.css"
import classNames from "classnames"


/**
 * A box with both a header and a body.
 *
 * @param header - The contents of the box header.
 * @param children - The contents of the box body.
 * @param className - Additional class(es) that should be added to the outer `<div>` of the box.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFull({ header, children, className, ...props }) {
    return (
        <div className={classNames(Style.BoxWithHeader, className)} {...props}>
            <div className={Style.BoxHeader}>
                {header}
            </div>
            <div className={Style.BoxBody}>
                {children}
            </div>
        </div>
    )
}
