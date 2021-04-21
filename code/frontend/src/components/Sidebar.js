import React from "react"
import Style from "./Sidebar.module.css"
import classNames from "classnames"
import Logo from "./Logo"
import ButtonSidebar from "./ButtonSidebar"
import { faCog, faExclamationTriangle, faFolder, faHome } from "@fortawesome/free-solid-svg-icons"


export default function Sidebar({ children, className, ...props }) {
    return (
        <div className={classNames(Style.Sidebar, className)} {...props}>
            {/* TODO: Aggiungere il logo qui! */}
            <Logo/>
            <ButtonSidebar to={"/"} icon={faHome}>Dashboard</ButtonSidebar>
            <ButtonSidebar to={"/repositories"} icon={faFolder}>Repositories</ButtonSidebar>
            <ButtonSidebar to={"/alerts"} icon={faExclamationTriangle}>Alerts</ButtonSidebar>
            <ButtonSidebar to={"/settings"} icon={faCog}>Settings</ButtonSidebar>
            {children}
        </div>
    )
}
