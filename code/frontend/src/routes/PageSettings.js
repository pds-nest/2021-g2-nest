import React from "react"
import Style from "./PageSettings.module.css"
import classNames from "classnames"
import BoxHeader from "../components/BoxHeader"
import BoxWithHeader from "../components/BoxWithHeader"
import Select from "../components/Select"
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
            <BoxWithHeader header={"Change your email address"}>

            </BoxWithHeader>
            <BoxWithHeader header={"Alert settings"}>

            </BoxWithHeader>
            <BoxWithHeader header={"Change your password"}>

            </BoxWithHeader>
        </div>
    )
}
