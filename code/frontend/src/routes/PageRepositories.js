import React from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"


export default function PageRepositories({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            {children}
        </div>
    )
}
