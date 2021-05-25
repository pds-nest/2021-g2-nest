import React, { useCallback, useContext } from "react"
import useBackendViewset from "../hooks/useBackendViewset"
import BoxRepositories from "../components/interactive/BoxRepositories"
import { useHistory } from "react-router"
import ContextLanguage from "../contexts/ContextLanguage"
import BoxHeader from "../components/base/BoxHeader"
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import ButtonHeader from "../components/base/ButtonHeader"
import BodyHorizontalHalves from "../components/base/layout/BodyHorizontalHalves"


export default function PageRepositoriesList() {
    const bv = useBackendViewset("/api/v1/repositories/", "id")
    const history = useHistory()
    const { strings } = useContext(ContextLanguage)

    const archive = useCallback(
        async (pk) => {
            await bv.apiRequest("PATCH", `/api/v1/repositories/${pk}`, {
                "close": true,
            })
            await bv.retrieveResource(pk)
        },
        [bv],
    )

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    <FontAwesomeIcon icon={faHome}/> {strings.dashboard}
                </BoxHeader>
            }
            buttons={
                <ButtonHeader
                    icon={faPlus}
                    color={"Green"}
                    onClick={() => history.push("/repositories/create")}
                >
                    {strings.createRepo}
                </ButtonHeader>
            }
        >
            <BodyHorizontalHalves
                upper={
                    <BoxRepositories
                        header={strings.menuActive}
                        loading={!bv.firstLoad}
                        running={bv.running}
                        repositories={bv.resources.filter(r => r.is_active)}
                        view={pk => history.push(`/repositories/${pk}`)}
                        share={pk => history.push(`/repositories/${pk}/share`)}
                        alerts={pk => history.push(`/repositories/${pk}/alerts`)}
                        archive={archive}
                        edit={pk => history.push(`/repositories/${pk}/edit`)}
                    />
                }
                lower={
                    <BoxRepositories
                        header={strings.menuArchived}
                        loading={!bv.firstLoad}
                        running={bv.running}
                        repositories={bv.resources.filter(r => !r.is_active)}
                        view={pk => history.push(`/repositories/${pk}`)}
                        destroy={bv.destroyResource}
                    />
                }
            />
        </PageWithHeader>
    )
}
