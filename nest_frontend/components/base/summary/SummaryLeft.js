import React from "react"
import Style from "./SummaryLeft.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function SummaryLeft({ icon, title, subtitle, className, onClick, disabled, ...props }) {
    const _onClick = disabled ? null : onClick

    return (
        <div
            className={classNames(
                Style.SummaryLeft,
                onClick ? "Clickable" : null,
                (onClick && disabled) ? "Disabled" : null,
                className
            )}
            onClick={_onClick}
            {...props}
        >
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
    )
}
