import React, { useContext } from "react"
import BoxFull from "../components/base/BoxFull"
import ContextLanguage from "../contexts/ContextLanguage"
import BoxHeader from "../components/base/BoxHeader"
import { useHistory, useParams } from "react-router"
import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import ButtonHeader from "../components/base/ButtonHeader"
import makeIcon from "../utils/makeIcon"


export default function PageRepositoryAlerts({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const { id } = useParams()
    const history = useHistory()

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {makeIcon(faBell)} {strings.alerts}
                </BoxHeader>
            }
            buttons={
                <ButtonHeader
                    icon={faPlus}
                    color={"Green"}
                    onClick={() => history.push(`/repositories/${id}/alerts/create`)}
                >
                    {strings.alertCreate}
                </ButtonHeader>
            }
        >
            <BoxFull header={strings.alertTitle}>
                {strings.notImplemented}
            </BoxFull>
        </PageWithHeader>
    )
}
