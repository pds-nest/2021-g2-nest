import React, { useContext } from "react"
import Style from "./PageDashboard.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import BoxUserCreate from "../components/interactive/BoxUserCreate"
import ContextUser from "../contexts/ContextUser"
import BoxAlert from "../components/base/BoxAlert"


export default function PageUsers({ children, className, ...props }) {
    const { user } = useContext(ContextUser)

    if(!user.isAdmin) {
        return (
            <BoxAlert color={"Red"}>
                Non sei un amministratore, pertanto non puoi gestire gli utenti della piattaforma.
            </BoxAlert>
        )
    }

    return (
        <div className={classNames(Style.PageHome, className)} {...props}>
            <BoxHeader className={Style.Header}>
                Gestisci utenti
            </BoxHeader>
            <BoxUserCreate/>
        </div>
    )
}
