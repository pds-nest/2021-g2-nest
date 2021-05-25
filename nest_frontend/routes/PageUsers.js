import React, { useContext } from "react"
import BoxHeader from "../components/base/BoxHeader"
import BoxUserCreate from "../components/interactive/BoxUserCreate"
import useBackendViewset from "../hooks/useBackendViewset"
import BoxUserList from "../components/interactive/BoxUserList"
import ContextLanguage from "../contexts/ContextLanguage"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import { faUserCog } from "@fortawesome/free-solid-svg-icons"
import makeIcon from "../utils/makeIcon"
import AlertError from "../components/interactive/AlertError"
import BodyHorizontalUpperGrow from "../components/base/layout/BodyHorizontalUpperGrow"


export default function PageUsers() {
    const { strings } = useContext(ContextLanguage)

    const {createResource, running, resources, destroyResource, error} = useBackendViewset("/api/v1/users/", "email")

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {makeIcon(faUserCog)} {strings.manageUsers}
                </BoxHeader>
            }
        >
            <BodyHorizontalUpperGrow
                upper={
                    <BoxUserList
                        users={resources}
                        destroyUser={destroyResource}
                        running={running}
                    />
                }
                lower={
                    <BoxUserCreate
                        createUser={createResource}
                        running={running}
                    />
                }
                error={error ? <AlertError error={error}/> : null}
            />
        </PageWithHeader>
    )
}
