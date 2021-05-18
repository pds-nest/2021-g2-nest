import React from "react"
import Style from "./SummaryText.module.css"
import classNames from "classnames"


export default function SummaryText({ children, className, ...props }) {
    return (
        <div className={classNames(Style.SummaryText, className)} {...props}>
            {children}
        </div>
    )
}
