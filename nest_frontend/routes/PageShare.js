import React, { useCallback, useContext } from "react"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import ContextLanguage from "../contexts/ContextLanguage"
import Style from "./PageShare.module.css"
import BoxUserList from "../components/interactive/BoxUserList"
import useBackendViewset from "../hooks/useBackendViewset"
import { useParams } from "react-router"
import ContextUser from "../contexts/ContextUser"
import Alert from "../components/base/Alert"
import useStrings from "../hooks/useStrings"


export default function PageShare({ className, ...props }) {
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
        <div className={classNames(Style.PageShare, className)} {...props}>
            <BoxHeader className={Style.Header}>
                {strings.repoShare}
            </BoxHeader>
            <BoxUserList
                className={Style.UserList}
                users={users.filter(user => user["email"] !== loggedUser["email"] && !authorizations.map(a => a.email).includes(user.email))}
                shareWithUser={shareWith}
                header={strings.availableUsers}
                running={usersBvRunning && authBvRunning}
            />
            <BoxUserList
                className={Style.SharingWith}
                users={users.filter(user => user["email"] === loggedUser["email"] || authorizations.map(a => a.email).includes(user.email))}
                unshareWithUser={unshareWith}
                header={strings.sharingWith}
                running={usersBvRunning && authBvRunning}
            />
            {authBvError ?
                <Alert color={"Red"} className={Style.Error}>{strings[authBvError?.data?.code ?? "errorUnknownError"]}</Alert>
            : null}
            {usersBvError ?
                <Alert color={"Red"} className={Style.Error}>{strings[usersBvError?.data?.code ?? "errorUnknownError"]}</Alert>
            : null}
        </div>
    )
}
