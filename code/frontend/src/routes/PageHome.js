import React from "react"
import Style from "./PageHome.module.css"
import classNames from "classnames"


export default function PageHome({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageHome, className)} {...props}>
            {children}
        </div>
    )
}
