import React, { Fragment, useContext } from "react"
import Style from "./Sidebar.module.css"
import classNames from "classnames"
import Logo from "./Logo"
import ButtonSidebar from "./ButtonSidebar"
import { faCog, faExclamationTriangle, faFolder, faHome, faKey, faWrench } from "@fortawesome/free-solid-svg-icons"
import ContextUser from "../contexts/ContextUser"


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
    const {user} = useContext(ContextUser)

    return (
        <aside className={classNames(Style.Sidebar, className)} {...props}>
            <Logo/>
            {
                user ?
                <Fragment>
                    <ButtonSidebar to={"/dashboard"} icon={faHome}>Dashboard</ButtonSidebar>
                    <ButtonSidebar to={"/repositories"} icon={faFolder}>Repositories</ButtonSidebar>
                    <ButtonSidebar to={"/alerts"} icon={faExclamationTriangle}>Alerts</ButtonSidebar>
                    <ButtonSidebar to={"/settings"} icon={faCog}>Settings</ButtonSidebar>
                </Fragment>
                :
                <Fragment>
                    <ButtonSidebar to={"/login"} icon={faKey}>Login</ButtonSidebar>
                </Fragment>
            }
            {
                process.env.NODE_ENV === "development" ?
                <ButtonSidebar to={"/sandbox"} icon={faWrench}>Sandbox</ButtonSidebar>
                : null
            }
        </aside>
    )
}
