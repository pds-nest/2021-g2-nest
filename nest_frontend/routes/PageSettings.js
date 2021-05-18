import React, { useContext } from "react"
import Style from "./PageSettings.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import BoxFull from "../components/base/BoxFull"
import SelectTheme from "../components/interactive/SelectTheme"
import BoxLoggedIn from "../components/interactive/BoxLoggedIn"
import SelectLanguage from "../components/interactive/SelectLanguage"
import ContextLanguage from "../contexts/ContextLanguage"


export default function PageSettings({ children, className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <div className={classNames(Style.PageSettings, className)} {...props}>
            <BoxLoggedIn/>
            <BoxHeader>
                {strings.switchTheme}: <SelectTheme/>
            </BoxHeader>
            <BoxHeader>
                {strings.changeLang}: <SelectLanguage/>
            </BoxHeader>
            <BoxFull header={strings.alertSettings}>
                {strings.notImplemented}
            </BoxFull>
            <BoxFull header={strings.changeEmail}>
                {strings.notImplemented}
            </BoxFull>
            <BoxFull header={strings.changePasswd}>
                {strings.notImplemented}
            </BoxFull>
        </div>
    )
}
