import React from "react"
import Style from "./Sidebar.module.css"
import classNames from "classnames"
import Logo from "./Logo"


export default function Sidebar({ children, className, ...props }) {
    return (
        <div className={classNames(Style.Sidebar, className)} {...props}>
            {/* TODO: Aggiungere il logo qui! */}
            <Logo/>
            {children}
        </div>
    )
}
