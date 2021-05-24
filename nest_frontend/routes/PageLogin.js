import React, { useContext } from "react"
import Style from "./PageLogin.module.css"
import classNames from "classnames"
import BoxSetServer from "../components/interactive/BoxSetServer"
import BoxLogin from "../components/interactive/BoxLogin"
import ContextUser from "../contexts/ContextUser"
import { Redirect } from "react-router"


export default function PageLogin({ className, ...props }) {
    const {user} = useContext(ContextUser)
    if(user) {
        return <Redirect to={"/repositories"}/>
    }

    return (
        <div className={classNames(Style.PageLogin, className)} {...props}>
            <BoxSetServer/>
            <BoxLogin/>
        </div>
    )
}
