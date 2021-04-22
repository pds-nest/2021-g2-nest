import React from "react"
import Style from "./Radio.module.css"
import classNames from "classnames"


export default function Radio({ children, className, ...props }) {
    return (
        <input type={"radio"} className={classNames(Style.Radio, className)} {...props}>
            {children}
        </input>
    )
}
