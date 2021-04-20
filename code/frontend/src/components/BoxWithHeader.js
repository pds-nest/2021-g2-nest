import React from "react"
import Style from "./BoxWithHeader.module.css"
import classNames from "classnames"


export default function BoxWithHeader({ header, body, className, ...props }) {
    return (
        <div className={classNames(Style.BoxWithHeader, className)} {...props}>
            <div className={classNames(Style.BoxHeader, header.className)}>
                {header.children}
            </div>
            <div className={classNames(Style.BoxBody, body.className)}>
                {body.children}
            </div>
        </div>
    )
}
