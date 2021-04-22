import React from "react"
import Style from "./PageSandbox.module.css"
import classNames from "classnames"


export default function PageSandbox({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageSandbox, className)} {...props}>
            {children}
        </div>
    )
}
