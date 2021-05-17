import React, { useContext } from "react"
import Style from "./Sidebar.module.css"
import classNames from "classnames"
import Logo from "../interactive/Logo"
import ButtonSidebar from "../base/ButtonSidebar"
import {
    faCog,
    faExclamationTriangle,
    faFolder,
    faHome,
    faKey,
    faUserCog,
} from "@fortawesome/free-solid-svg-icons"
import ContextUser from "../../contexts/ContextUser"
import Localization from "../../Localization"


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
    const { user } = useContext(ContextUser)

    return (
        <aside className={classNames(Style.Sidebar, className)} {...props}>
            <Logo/>
            {
                user ?
                <>
                    <ButtonSidebar to={"/dashboard"} icon={faHome}>{Localization.dashboard}</ButtonSidebar>
                    <ButtonSidebar to={"/repositories"} icon={faFolder}>{Localization.repositories}</ButtonSidebar>
                    <ButtonSidebar to={"/alerts"} icon={faExclamationTriangle}>{Localization.alerts}</ButtonSidebar>
                    <ButtonSidebar to={"/settings"} icon={faCog}>{Localization.settings}</ButtonSidebar>
                </>
                     :
                <>
                    <ButtonSidebar to={"/login"} icon={faKey}>{Localization.login}</ButtonSidebar>
                </>
            }
            {
                user && user.isAdmin ?
                <>
                    <ButtonSidebar to={"/users"} icon={faUserCog}>{Localization.users}</ButtonSidebar>
                </>
                                     :
                null
            }
        </aside>
    )
}
