import React from "react"
import Style from "./Checkbox.module.css"
import classNames from "classnames"


export default function Checkbox({ children, className, ...props }) {
    return (
        <input type={"checkbox"} className={classNames(Style.Checkbox, className)} {...props}>
            {children}
        </input>
    )
}
