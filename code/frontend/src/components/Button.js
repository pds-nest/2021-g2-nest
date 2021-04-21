import React, { isValidElement } from "react"
import Style from "./Button.module.css"
import classNames from "classnames"
import isString from "is-string"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


export default function Button({ children, className, color, icon, ...props }) {
    let iconElement;

    if(isValidElement(icon)) {
        iconElement = <span className={Style.Icon}>icon</span>;
    }
    else if(icon) {
        iconElement = (
            <span className={Style.Icon}><FontAwesomeIcon icon={icon}/></span>
        )
    }
    else {
        iconElement = null;
    }

    return (
        <button className={classNames(Style.Button, Style[`Button${color}`], className)} {...props}>
            {children} {iconElement}
        </button>
    )
}
