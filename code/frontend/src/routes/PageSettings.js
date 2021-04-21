import React from "react"
import Style from "./PageSettings.module.css"
import classNames from "classnames"


export default function PageSettings({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageSettings, className)} {...props}>
            {children}
        </div>
    )
}
