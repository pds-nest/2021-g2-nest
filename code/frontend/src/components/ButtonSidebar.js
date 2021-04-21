import React from "react"
import Style from "./ButtonSidebar.module.css"
import classNames from "classnames"
import make_icon from "../utils/make_icon"


export default function ButtonSidebar({ icon, children, className, ...props }) {
    return (
        <button className={classNames(Style.ButtonSidebar, className)} {...props}>
            {make_icon(icon, Style.ButtonIcon)}
            <div className={Style.ButtonText}>
                {children}
            </div>
        </button>
    )
}
