import React from "react"
import Style from "./FormInline.module.css"
import classNames from "classnames"


export default function FormInline({ children, className, ...props }) {
    return (
        <div className={classNames(Style.FormInline, className)} {...props}>
            {children}
        </div>
    )
}
