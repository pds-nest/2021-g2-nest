import React, { useContext } from "react"
import BoxFull from "../components/base/BoxFull"
import SelectTheme from "../components/interactive/SelectTheme"
import BoxLoggedIn from "../components/interactive/BoxLoggedIn"
import SelectLanguage from "../components/interactive/SelectLanguage"
import ContextLanguage from "../contexts/ContextLanguage"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import BoxHeader from "../components/base/BoxHeader"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import makeIcon from "../utils/makeIcon"
import BodyFlex from "../components/base/layout/BodyFlex"


export default function PageSettings({ children, className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {makeIcon(faCog)} {strings.settings}
                </BoxHeader>
            }
        >
            <BodyFlex>
                <BoxLoggedIn/>
                <BoxFull header={strings.changeLang}>
                    <SelectLanguage/>
                </BoxFull>
                <BoxFull header={strings.switchTheme}>
                    <SelectTheme/>
                </BoxFull>
            </BodyFlex>
        </PageWithHeader>
    )
}
