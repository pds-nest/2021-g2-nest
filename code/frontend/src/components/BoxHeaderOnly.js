import React from "react"
import Style from "./BoxHeaderOnly.module.css"
import classNames from "classnames"


export default function BoxHeaderOnly({ children, className, ...props }) {
    return (
        <div className={classNames(Style.BoxHeaderOnly, className)} {...props}>
            {children}
        </div>
    )
}
