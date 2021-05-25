import React, { useCallback, useContext } from "react"
import BoxHeader from "../components/base/BoxHeader"
import BoxUserList from "../components/interactive/BoxUserList"
import useBackendViewset from "../hooks/useBackendViewset"
import { useParams } from "react-router"
import ContextUser from "../contexts/ContextUser"
import useStrings from "../hooks/useStrings"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import BodyHorizontalHalves from "../components/base/layout/BodyHorizontalHalves"
import AlertError from "../components/interactive/AlertError"


export default function PageShare() {
    const strings = useStrings()
    const { user: loggedUser } = useContext(ContextUser)
    const { id } = useParams()

    const {
        resources: authorizations,
        createResource: createAuthorization,
        destroyResource: destroyAuthorization,
        running: authBvRunning,
        error: authBvError,
    } = useBackendViewset(
        `/api/v1/repositories/${id}/authorizations/`,
        "email",
        {
            list: true,
            create: true,
            retrieve: false,
            edit: false,
            destroy: true,
            command: false,
            action: false,
        }
    )

    const {
        resources: users,
        running: usersBvRunning,
        error: usersBvError,
    } = useBackendViewset(
        "/api/v1/users/",
        "email",
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

    const shareWith = useCallback(
        user => {
            console.info("Authorizing ", user, " ...")
            createAuthorization({rid: id, email: user.email})
        },
        [createAuthorization, id]
    )

    const unshareWith = useCallback(
        user => {
            console.info("Deauthorizing ", user, " ...")
            destroyAuthorization(user.email)
        },
        [destroyAuthorization, id]
    )

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {strings.repoShare}
                </BoxHeader>
            }
        >
            <BodyHorizontalHalves
                upper={
                    <BoxUserList
                        users={users.filter(user => user["email"] !== loggedUser["email"] && !authorizations.map(a => a.email).includes(user.email))}
                        shareWithUser={shareWith}
                        header={strings.availableUsers}
                        running={usersBvRunning || authBvRunning}
                    />
                }
                lower={<>
                    <BoxUserList
                        users={users.filter(user => user["email"] === loggedUser["email"] || authorizations.map(a => a.email).includes(user.email))}
                        unshareWithUser={unshareWith}
                        header={strings.sharingWith}
                        running={usersBvRunning || authBvRunning}
                    />
                </>}
                error={<>
                    {authBvError ? <AlertError error={authBvError}/> : null}
                    {usersBvError ? <AlertError error={usersBvError}/> : null}
                </>}
            />
        </PageWithHeader>
    )
}
