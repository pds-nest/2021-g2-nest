import React, { useContext } from "react"
import BoxSetServer from "../components/interactive/BoxSetServer"
import BoxLogin from "../components/interactive/BoxLogin"
import ContextUser from "../contexts/ContextUser"
import { Redirect } from "react-router"
import BoxHeader from "../components/base/BoxHeader"
import useStrings from "../hooks/useStrings"
import BoxFull from "../components/base/BoxFull"
import SelectLanguage from "../components/interactive/SelectLanguage"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import BodyFlex from "../components/base/layout/BodyFlex"


export default function PageLogin() {
    const {user} = useContext(ContextUser)
    const strings = useStrings()

    if(user) {
        return <Redirect to={"/repositories"}/>
    }

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {strings.welcomeToNest}
                </BoxHeader>
            }
        >
            <BodyFlex>
                <BoxSetServer/>
                <BoxLogin/>
                <BoxFull header={strings.changeLang}>
                    <SelectLanguage/>
                </BoxFull>
            </BodyFlex>
        </PageWithHeader>
    )
}
