import React, { useContext } from "react"
import Style from "./Sidebar.module.css"
import classNames from "classnames"
import Logo from "../interactive/Logo"
import ButtonSidebar from "../base/ButtonSidebar"
import { faCog, faExclamationTriangle, faFolder, faHome, faKey, faUserCog } from "@fortawesome/free-solid-svg-icons"
import ContextUser from "../../contexts/ContextUser"
import ContextLanguage from "../../contexts/ContextLanguage"


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
    const { strings } = useContext(ContextLanguage)

    return (
        <aside className={classNames(Style.Sidebar, className)} {...props}>
            <Logo/>
            {
                user ?
                <>
                    <ButtonSidebar to={"/dashboard"} icon={faHome}>{strings.dashboard}</ButtonSidebar>
                    <ButtonSidebar to={"/repositories"} icon={faFolder}>{strings.repositories}</ButtonSidebar>
                    <ButtonSidebar to={"/alerts"} icon={faExclamationTriangle}>{strings.alerts}</ButtonSidebar>
                    <ButtonSidebar to={"/settings"} icon={faCog}>{strings.settings}</ButtonSidebar>
                </>
                     :
                <>
                    <ButtonSidebar to={"/login"} icon={faKey}>{strings.login}</ButtonSidebar>
                </>
            }
            {
                user && user.isAdmin ?
                <>
                    <ButtonSidebar to={"/users"} icon={faUserCog}>{strings.users}</ButtonSidebar>
                </>
                                     :
                null
            }
        </aside>
    )
}
