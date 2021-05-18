import React from "react"
import Style from "./SummaryText.module.css"
import classNames from "classnames"


export default function SummaryText({ children, className, ...props }) {
    return (
        <div className={classNames(Style.SummaryText, className)} {...props}>
            <div className={Style.Text}>
                {children}
            </div>
        </div>
    )
}
