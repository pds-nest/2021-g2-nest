import React from "react"
import Style from "./SummaryLeft.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function SummaryLeft({ icon, title, subtitle, className, onClick, ...props }) {
    return (
        <div
            className={classNames(Style.SummaryLeft, onClick ? "Clickable" : null, className)}
            onClick={onClick}
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
