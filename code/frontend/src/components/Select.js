import React from "react"
import Style from "./Select.module.css"
import classNames from "classnames"


export default function Select({ children, className, ...props }) {
    return (
        <select className={classNames(Style.Select, className)} {...props}>
            {children}
        </select>
    )
}
