import React  from "react"
import Style from "./Button.module.css"
import classNames from "classnames"
import make_icon from "../utils/make_icon"


export default function Button({ children, className, color, icon, ...props }) {

    return (
        <button type={"button"} className={classNames(Style.Button, Style[`Button${color}`], className)} {...props}>
            {children} {make_icon(icon, Style.Icon)}
        </button>
    )
}
