import React from "react"
import Style from "./PageAlerts.module.css"
import classNames from "classnames"


export default function PageAlerts({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageAlerts, className)} {...props}>
            {children}
        </div>
    )
}
