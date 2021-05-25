import React, { useCallback, useContext } from "react"
import ContextLanguage from "../contexts/ContextLanguage"
import BoxHeader from "../components/base/BoxHeader"
import { useHistory, useParams } from "react-router"
import { faBell, faPlus } from "@fortawesome/free-solid-svg-icons"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import ButtonHeader from "../components/base/ButtonHeader"
import makeIcon from "../utils/makeIcon"
import useBackendViewset from "../hooks/useBackendViewset"
import BoxAlerts from "../components/interactive/BoxAlerts"


export default function PageRepositoryAlerts() {
    const { strings } = useContext(ContextLanguage)
    const { id } = useParams()
    const history = useHistory()
    const {resources, running: repoRunning, listResources} = useBackendViewset(
        `/api/v1/repositories/${id}/alerts/`,
        "id",
        {
            list: true,
            create: false,
            retrieve: false,
            edit: false,
            destroy: false,
            command: false,
            action: false,
        }
    )
    const {destroyResource, running: alertRunning} = useBackendViewset(
        `/api/v1/alert/`,
        "id",
        {
            list: false,
            create: false,
            retrieve: false,
            edit: false,
            destroy: true,
            command: false,
            action: false,
        }
    )

    // FIXME: A bit of an hack but it works for small amounts of repositories
    const destroyAndRefresh = useCallback(
        async (id) => {
            await destroyResource(id)
            await listResources()
        },
        [destroyResource, listResources]
    )

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
            <BoxAlerts alerts={resources} destroy={destroyAndRefresh} running={repoRunning || alertRunning}/>
        </PageWithHeader>
    )
}
