import React, { useContext } from "react"
import BoxFull from "../components/base/BoxFull"
import ContextLanguage from "../contexts/ContextLanguage"
import BoxHeader from "../components/base/BoxHeader"
import { useHistory, useParams } from "react-router"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import makeIcon from "../utils/makeIcon"
import useBackendViewset from "../hooks/useBackendViewset"


export default function PageRepositoryAlertsCreate() {
    const { strings } = useContext(ContextLanguage)
    const { id } = useParams()
    const history = useHistory()

    const {createResource} = useBackendViewset(
        `/api/v1/repositories/${id}/alerts/`,
        "name",
        {
            list: false,
            create: true,
            retrieve: false,
            edit: false,
            destroy: false,
            command: false,
            action: false,
        }
    )

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {makeIcon(faPlus)} {strings.alertCreate}
                </BoxHeader>
            }
        >
            <BoxFull header={strings.alertTitle}>
                {strings.notImplemented}
            </BoxFull>
        </PageWithHeader>
    )
}
