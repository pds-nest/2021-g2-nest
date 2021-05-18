import React from "react"
import Style from "./SummaryBase.module.css"
import classNames from "classnames"


export default function SummaryBase({ children, className, ...props }) {
    return (
        <div className={classNames(Style.SummaryBase, className)} {...props}>
            {children}
        </div>
    )
}
