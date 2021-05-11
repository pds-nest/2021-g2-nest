import React from "react"
import Style from "./Summary.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function Summary(
    { title, subtitle, upperLabel, upperValue, lowerLabel, lowerValue, buttons, className, ...props },
) {
    return (
        <div className={classNames(Style.Summary, className)} {...props}>
            <div className={Style.Left}>
                <div className={Style.IconContainer}>
                    <FontAwesomeIcon icon={icon}/>
                </div>
                <div className={Style.Title}>
                    {title}
                </div>
                <div className={Style.Subtitle}>
                    {subtitle}
                </div>
            </div>
            <div className={Style.Middle}>
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
            <div className={Style.Right}>
                {buttons}
            </div>
        </div>
    )
}
