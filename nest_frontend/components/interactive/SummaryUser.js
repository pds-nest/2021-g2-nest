import React, { useContext } from "react"
import { faStar, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import ContextLanguage from "../../contexts/ContextLanguage"
import SummaryBase from "../base/summary/SummaryBase"
import SummaryLeft from "../base/summary/SummaryLeft"
import SummaryLabels from "../base/summary/SummaryLabels"
import SummaryButton from "../base/summary/SummaryButton"
import SummaryRight from "../base/summary/SummaryRight"


export default function SummaryUser({ user, destroyUser, running, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <SummaryBase>
            <SummaryLeft
                icon={user.isAdmin ? faStar : faUser}
                title={user.username}
                subtitle={user.email}
            />
            <SummaryLabels
                upperLabel={strings.type}
                upperValue={user.isAdmin ? strings.admin : strings.user}
            />
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
            <SummaryRight/>
        </SummaryBase>
    )
}
