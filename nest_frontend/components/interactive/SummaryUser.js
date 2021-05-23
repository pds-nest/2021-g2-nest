import React, { useContext } from "react"
import { faShare, faStar, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import ContextLanguage from "../../contexts/ContextLanguage"
import SummaryBase from "../base/summary/SummaryBase"
import SummaryLeft from "../base/summary/SummaryLeft"
import SummaryLabels from "../base/summary/SummaryLabels"
import SummaryButton from "../base/summary/SummaryButton"
import SummaryRight from "../base/summary/SummaryRight"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"


/**
 * A {@link SummaryBase} representing a N.E.S.T. user.
 *
 * @param user - The user to represent.
 * @param shareWithUser - Async function to share a repository with an user, to be passed to {@link SummaryUser}.
 * @param unshareWithUser - Async function to unshare a repository with an user, to be passed to {@link SummaryUser}.
 * @param destroyUser - Async function <string> to destroy an user from the frontend.
 * @param running - Whether another request is already running.
 * @param props - Additional props to pass to the summary.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SummaryUser({ user, shareWithUser, unshareWithUser, destroyUser, running, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <SummaryBase {...props}>
            <SummaryLeft
                icon={user.isAdmin ? faStar : faUser}
                title={user.username}
                subtitle={user.email}
                disabled={running}
            />
            <SummaryLabels
                upperLabel={strings.type}
                upperValue={user.isAdmin ? strings.admin : strings.user}
            />
            {shareWithUser ?
             <SummaryButton
                 color={"Green"}
                 icon={faShare}
                 onClick={async event => {
                     event.stopPropagation()
                     await shareWithUser(user)
                 }}
                 disabled={running}
             >
                 {strings.share}
             </SummaryButton>
                         : null}
            {unshareWithUser ?
             <SummaryButton
                 color={"Red"}
                 icon={<FontAwesomeIcon icon={faShare} flip={"horizontal"}/>}
                 onClick={async event => {
                     event.stopPropagation()
                     await unshareWithUser(user)
                 }}
                 disabled={running}
             >
                 {strings.unshare}
             </SummaryButton>
                         : null}
            {destroyUser ?
             <SummaryButton
                 color={"Red"}
                 icon={faTrash}
                 onClick={async event => {
                     event.stopPropagation()
                     // TODO: Errors are not caught here. Where should they be displayed?
                     await destroyUser(user["email"])
                 }}
                 disabled={running}
             >
                 {strings.delete}
             </SummaryButton>
            : null}
            <SummaryRight/>
        </SummaryBase>
    )
}
