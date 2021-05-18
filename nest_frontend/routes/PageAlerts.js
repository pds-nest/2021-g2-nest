import React, { useContext } from "react"
import Style from "./PageAlerts.module.css"
import classNames from "classnames"
import BoxFull from "../components/base/BoxFull"
import ContextLanguage from "../contexts/ContextLanguage"


export default function PageAlerts({ children, className, ...props }) {
    const {strings} = useContext(ContextLanguage)

    return (
        <div className={classNames(Style.PageAlerts, className)} {...props}>
            <BoxFull header={"I tuoi allarmi"} className={Style.YourAlerts}>
                🚧 Non implementato.
            </BoxFull>
            <BoxFull header={"Crea un nuovo allarme"} className={Style.CreateAlert}>
                🚧 Non implementato.
            </BoxFull>
        </div>
    )
}
