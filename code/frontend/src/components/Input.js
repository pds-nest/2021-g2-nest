import React from "react"
import Style from "./Input.module.css"
import classNames from "classnames"


export default function Input({ children, className, ...props }) {
    return (
        <input className={classNames(Style.Input, className)} {...props}>
            {children}
        </input>
    )
}
