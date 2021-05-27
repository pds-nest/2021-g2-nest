import React, { useContext } from "react"
import Style from "./Window.module.css"
import classNames from "classnames"
import ContextTheme from "../../../contexts/ContextTheme"


export default function Window({ children, className, ...props }) {
    const {theme} = useContext(ContextTheme)

    return (
        <div className={classNames(Style.Window, theme, className)} {...props}>
            {children}
        </div>
    )
}
