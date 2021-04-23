import React from "react"
import Style from "./PageSettings.module.css"
import classNames from "classnames"
import BoxHeader from "../components/BoxHeader"
import BoxFull from "../components/BoxFull"
import SelectTheme from "../components/SelectTheme"


export default function PageSettings({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageSettings, className)} {...props}>
            <BoxHeader>
                You are currently logged in as:
            </BoxHeader>
            <BoxHeader>
                Switch theme: <SelectTheme/>
            </BoxHeader>
            <BoxFull header={"Change your email address"}>

            </BoxFull>
            <BoxFull header={"Alert settings"}>

            </BoxFull>
            <BoxFull header={"Change your password"}>

            </BoxFull>
        </div>
    )
}
