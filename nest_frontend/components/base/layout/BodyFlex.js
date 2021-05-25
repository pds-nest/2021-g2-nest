import React from "react"
import Style from "./BodyFlex.module.css"
import classNames from "classnames"


export default function BodyFlex({ children, className, ...props }) {
    return (
        <div className={classNames(Style.BodyFlex, className)} {...props}>
            {children}
        </div>
    )
}
