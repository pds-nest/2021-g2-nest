import React from "react"
import Style from "./Sidebar.module.css"
import classNames from "classnames"
import Logo from "./Logo"
import ButtonSidebar from "./ButtonSidebar"
import { faCog, faExclamationTriangle, faFolder, faHome, faWrench } from "@fortawesome/free-solid-svg-icons"


/**
 * The sidebar of the website, with the logo, buttons to switch between the various pages and a notification counter.
 *
 * @todo The notification counter is still missing.
 * @param className - Additional class(es) to be added to the outer container.
 * @param props - Additional props to be passed to the outer container.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Sidebar({ className, ...props }) {
    return (
        <div className={classNames(Style.Sidebar, className)} {...props}>
            <Logo/>
            <ButtonSidebar to={"/"} icon={faHome}>Dashboard</ButtonSidebar>
            <ButtonSidebar to={"/repositories"} icon={faFolder}>Repositories</ButtonSidebar>
            <ButtonSidebar to={"/alerts"} icon={faExclamationTriangle}>Alerts</ButtonSidebar>
            <ButtonSidebar to={"/settings"} icon={faCog}>Settings</ButtonSidebar>
            {
                process.env.NODE_ENV === "development" ?
                <ButtonSidebar to={"/sandbox"} icon={faWrench}>Sandbox</ButtonSidebar>
                : null
            }
        </div>
    )
}
