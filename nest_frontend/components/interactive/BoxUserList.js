import React, { useContext } from "react"
import Loading from "../base/Loading"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryUser from "./SummaryUser"
import ContextLanguage from "../../contexts/ContextLanguage"


/**
 * A {@link BoxFullScrollable} rendering an array of users as {@link SummaryUser}s.
 *
 * @param users - Array of users to render.
 * @param shareWithUser - Async function to share a repository with an user, to be passed to {@link SummaryUser}.
 * @param unshareWithUser - Async function to unshare a repository with an user, to be passed to {@link SummaryUser}.
 * @param destroyUser - Async function to destroy an user, to be passed to {@link SummaryUser}.
 * @param running - Whether another request is currently running.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxUserList({ users, shareWithUser, unshareWithUser, destroyUser, running, ...props }) {
    const { strings } = useContext(ContextLanguage)

    let contents
    if(users === null) {
        contents = <Loading/>
    }
    else {
        contents = users.map(user => (
                <SummaryUser
                    key={user["email"]}
                    shareWithUser={shareWithUser}
                    unshareWithUser={unshareWithUser}
                    destroyUser={destroyUser}
                    running={running}
                    user={user}
                />
            )
        )
    }

    return (
        <BoxFullScrollable header={strings.userList} {...props}>
            {contents}
        </BoxFullScrollable>
    )
}
