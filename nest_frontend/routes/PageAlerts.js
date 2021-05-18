import React, { useContext } from "react"
import Style from "./PageAlerts.module.css"
import classNames from "classnames"
import BoxFull from "../components/base/BoxFull"
import ContextLanguage from "../contexts/ContextLanguage"


export default function PageAlerts({ children, className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <div className={classNames(Style.PageAlerts, className)} {...props}>
            <BoxFull header={strings.alertTitle} className={Style.YourAlerts}>
                {strings.notImplemented}
            </BoxFull>
            <BoxFull header={strings.alertCreate} className={Style.CreateAlert}>
                {strings.notImplemented}
            </BoxFull>
        </div>
    )
}
