import React from "react"
import Style from "./SummaryLabels.module.css"
import classNames from "classnames"


export default function SummaryLabels({
                                          children,
                                          upperLabel,
                                          upperValue,
                                          lowerLabel,
                                          lowerValue,
                                          className,
                                          ...props
                                      }) {
    return (
        <div className={classNames(Style.SummaryLabels, className)} {...props}>
            <div className={classNames(Style.Label, Style.Upper)}>
                {upperLabel}
            </div>
            <div className={classNames(Style.Value, Style.Upper)}>
                {upperValue}
            </div>
            <div className={classNames(Style.Label, Style.Lower)}>
                {lowerLabel}
            </div>
            <div className={classNames(Style.Value, Style.Lower)}>
                {lowerValue}
            </div>
        </div>
    )
}
