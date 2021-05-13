import React from "react"
import Style from "./PageSettings.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import BoxFull from "../components/base/BoxFull"
import SelectTheme from "../components/interactive/SelectTheme"
import BoxLoggedIn from "../components/interactive/BoxLoggedIn"


export default function PageSettings({ children, className, ...props }) {

    return (
        <div className={classNames(Style.PageSettings, className)} {...props}>
            <BoxLoggedIn/>
            <BoxHeader>
                Cambia tema: <SelectTheme/>
            </BoxHeader>
            <BoxFull header={"Impostazioni allarmi"}>
                🚧 Non implementato.
            </BoxFull>
            <BoxFull header={"Cambia il tuo indirizzo email"}>
                🚧 Non implementato.
            </BoxFull>
            <BoxFull header={"Cambia la tua password"}>
                🚧 Non implementato.
            </BoxFull>
        </div>
    )
}
