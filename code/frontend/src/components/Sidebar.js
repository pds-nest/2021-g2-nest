import React from "react"
import Style from "./Sidebar.module.css"
import classNames from "classnames"
import Logo from "./Logo"
import ButtonSidebar from "./ButtonSidebar"
import { faHome } from "@fortawesome/free-solid-svg-icons"


export default function Sidebar({ children, className, ...props }) {
    return (
        <div className={classNames(Style.Sidebar, className)} {...props}>
            {/* TODO: Aggiungere il logo qui! */}
            <Logo/>
            <ButtonSidebar icon={faHome}>Dashboard</ButtonSidebar>
            {children}
        </div>
    )
}
