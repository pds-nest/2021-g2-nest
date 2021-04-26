import React from "react"
import Style from "./PageLogin.module.css"
import classNames from "classnames"
import BoxSetServer from "../components/BoxSetServer"
import BoxLogin from "../components/BoxLogin"


export default function PageLogin({ className, ...props }) {
    return (
        <div className={classNames(Style.PageLogin, className)} {...props}>
            <BoxSetServer/>
            <BoxLogin/>
        </div>
    )
}
