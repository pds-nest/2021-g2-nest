import React from "react"
import Style from "./PageSettings.module.css"
import classNames from "classnames"
import BoxHeaderOnly from "../components/BoxHeaderOnly"
import BoxWithHeader from "../components/BoxWithHeader"


export default function PageSettings({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageSettings, className)} {...props}>
            <BoxHeaderOnly>
                You are currently logged in as:
            </BoxHeaderOnly>
            <BoxHeaderOnly>
                Switch theme:
            </BoxHeaderOnly>
            <BoxWithHeader header={"Change your email address"}>

            </BoxWithHeader>
            <BoxWithHeader header={"Alert settings"}>

            </BoxWithHeader>
            <BoxWithHeader header={"Change your password"}>

            </BoxWithHeader>
        </div>
    )
}
