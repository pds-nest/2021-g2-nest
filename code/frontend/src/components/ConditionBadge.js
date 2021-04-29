import React from "react"
import Style from "./ConditionBadge.module.css"
import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ButtonSmallX from "./ButtonSmallX"


export default function ConditionBadge({ color, icon, onDelete, children, className, ...props }) {
    return (
        <div className={classNames(Style.ConditionBadge, Style[`ConditionBadge${color}`], className)} {...props}>
            <div className={Style.Icon}>
                <FontAwesomeIcon icon={icon}/>
            </div>
            <div>
                {children}
            </div>
            <div>
                <ButtonSmallX onClick={onDelete}/>
            </div>
        </div>
    )
}
