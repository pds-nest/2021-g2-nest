import React, { useContext } from "react"
import { faArchive, faFolder, faFolderOpen, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router"
import ContextLanguage from "../../contexts/ContextLanguage"
import SummaryBase from "../base/summary/SummaryBase"
import SummaryLeft from "../base/summary/SummaryLeft"
import SummaryLabels from "../base/summary/SummaryLabels"
import SummaryButton from "../base/summary/SummaryButton"
import SummaryRight from "../base/summary/SummaryRight"


/**
 * A long line representing a repository in a list.
 *
 * @param repo - The repository object.
 * @param refresh - Function that can be called to refresh the repositories list.
 * @param canDelete - If the Delete button should be displayed or not.
 * @param deleteSelf - Function to call when the Delete button is pressed.
 * @param canEdit - If the Edit button should be displayed or not.
 * @param canArchive - If the Archive button should be displayed or not.
 * @param archiveSelf - Function to call when the Archive button is pressed.
 * @param running - If an action is currently running.
 * @param className - Additional class(es) to be added to the outer box.
 * @param props - Additional props to pass to the outer box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SummaryRepository(
    { repo, refresh, canDelete, deleteSelf, canEdit, canArchive, archiveSelf, running, className, ...props },
) {
    const history = useHistory()
    const { strings } = useContext(ContextLanguage)

    const onRepoClick = () => {
        history.push(`/repositories/${repo.id}`)
    }

    const onEditClick = () => {
        history.push(`/repositories/${repo.id}/edit`)
    }

    return (
        <SummaryBase {...props}>
            <SummaryLeft
                icon={repo.is_active ? faFolderOpen : faFolder}
                title={repo.name}
                subtitle={repo.owner ? repo.owner.username : null}
                onClick={onRepoClick}
            />
            <SummaryLabels
                upperLabel={strings.created}
                upperValue={repo.start ? new Date(repo.start).toLocaleString() : null}
                lowerLabel={strings.archived}
                lowerValue={repo.end ? new Date(repo.end).toLocaleString() : null}
            />
            {canDelete ?
             <SummaryButton
                 color={"Red"}
                 icon={faTrash}
                 onClick={deleteSelf}
                 disabled={running}
             >
                 {strings.delete}
             </SummaryButton>
                       : null}
            {canEdit ?
             <SummaryButton
                 color={"Yellow"}
                 icon={faPencilAlt}
                 onClick={onEditClick}
                 disabled={running}
             >
                 {strings.edit}
             </SummaryButton>
                     : null}
            {canArchive ?
             <SummaryButton
                 color={"Grey"}
                 icon={faArchive}
                 onClick={archiveSelf}
                 disabled={running}
             >
                 {strings.archive}
             </SummaryButton>
                        : null}
            <SummaryRight/>
        </SummaryBase>
    )
}