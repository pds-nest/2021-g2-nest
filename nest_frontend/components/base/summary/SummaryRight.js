import React from "react"
import Style from "./SummaryRight.module.css"
import classNames from "classnames"


export default function SummaryRight({ children, className, ...props }) {
    return (
        <div className={classNames(Style.SummaryRight, className)} {...props}>
            {children}
        </div>
    )
}
