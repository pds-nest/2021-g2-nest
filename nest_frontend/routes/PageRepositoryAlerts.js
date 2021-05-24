import React, { useContext } from "react"
import Style from "./PageRepositoryAlerts.module.css"
import classNames from "classnames"
import BoxFull from "../components/base/BoxFull"
import ContextLanguage from "../contexts/ContextLanguage"
import BoxHeader from "../components/base/BoxHeader"
import { useParams } from "react-router"


export default function PageRepositoryAlerts({ children, className, ...props }) {
    const { strings } = useContext(ContextLanguage)
    const { id } = useParams()

    return (
        <div className={classNames(Style.PageAlerts, className)} {...props}>
            <BoxHeader className={Style.Header}>
                {strings.alerts}
            </BoxHeader>
            <BoxFull header={strings.alertTitle} className={Style.YourAlerts}>
                {strings.notImplemented}
            </BoxFull>
            <BoxFull header={strings.alertCreate} className={Style.CreateAlert}>
                {strings.notImplemented}
            </BoxFull>
        </div>
    )
}
