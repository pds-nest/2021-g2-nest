import React, { useContext } from "react"
import Style from "./PageLogin.module.css"
import classNames from "classnames"
import BoxSetServer from "../components/interactive/BoxSetServer"
import BoxLogin from "../components/interactive/BoxLogin"
import ContextUser from "../contexts/ContextUser"
import { Redirect } from "react-router"
import BoxHeader from "../components/base/BoxHeader"
import useStrings from "../hooks/useStrings"
import BoxFull from "../components/base/BoxFull"
import SelectLanguage from "../components/interactive/SelectLanguage"


export default function PageLogin({ className, ...props }) {
    const {user} = useContext(ContextUser)
    const strings = useStrings()

    if(user) {
        return <Redirect to={"/repositories"}/>
    }

    return (
        <div className={classNames(Style.PageLogin, className)} {...props}>
            <BoxHeader>
                {strings.welcomeToNest}
            </BoxHeader>
            <BoxSetServer/>
            <BoxLogin/>
            <BoxFull header={strings.changeLang}>
                <SelectLanguage/>
            </BoxFull>
        </div>
    )
}
