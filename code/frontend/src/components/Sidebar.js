import React from "react"
import Style from "./Sidebar.module.css"
import classNames from "classnames"


export default function Sidebar({ children, className, ...props }) {
    return (
        <div className={classNames(Style.Sidebar, className)} {...props}>
            {children}
        </div>
    )
}
