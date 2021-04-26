import React from "react"
import Style from "./PageSettings.module.css"
import classNames from "classnames"
import BoxHeader from "../components/BoxHeader"
import BoxFull from "../components/BoxFull"
import SelectTheme from "../components/SelectTheme"
import BoxLoggedIn from "../components/BoxLoggedIn"


export default function PageSettings({ children, className, ...props }) {

    return (
        <div className={classNames(Style.PageSettings, className)} {...props}>
            <BoxLoggedIn/>
            <BoxHeader>
                Switch theme: <SelectTheme/>
            </BoxHeader>
            <BoxFull header={"Alert settings"}>
                🚧 Not implemented.
            </BoxFull>
            <BoxFull header={"Change your email address"}>
                🚧 Not implemented.
            </BoxFull>
            <BoxFull header={"Change your password"}>
                🚧 Not implemented.
            </BoxFull>
        </div>
    )
}
