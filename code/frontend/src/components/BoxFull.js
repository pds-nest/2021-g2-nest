import React from "react"
import Style from "./BoxFull.module.css"
import classNames from "classnames"


/**
 * A box with both a header and a body.
 *
 * @param header - The contents of the box header.
 * @param headerClassName - Additional class(es) added to the inner `<div>` acting as the header.
 * @param headerProps - Additional props passed to the inner `<div>` acting as the header.
 * @param children - The contents of the box body.
 * @param childrenClassName - Additional class(es) added to the inner `<div>` acting as the body.
 * @param childrenProps - Additional props passed to the inner `<div>` acting as the body.
 * @param className - Additional class(es) that should be added to the outer `<div>` of the box.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFull(
    {
        header,
        headerClassName,
        headerProps,
        children,
        childrenClassName,
        childrenProps,
        className,
        ...props
    }) {

    return (
        <div className={classNames(Style.BoxWithHeader, className)} {...props}>
            <div className={classNames(Style.BoxHeader, headerClassName)} {...headerProps}>
                {header}
            </div>
            <div className={classNames(Style.BoxBody, childrenClassName)} {...childrenProps}>
                {children}
            </div>
        </div>
    )
}
