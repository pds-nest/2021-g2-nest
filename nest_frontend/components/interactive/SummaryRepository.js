import React, { useContext } from "react"
import Button from "../base/Button"
import { faArchive, faFolder, faFolderOpen, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router"
import Summary from "../base/Summary"
import ContextLanguage from "../../contexts/ContextLanguage"


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
    const {strings} = useContext(ContextLanguage)

    const onRepoClick = () => {
        history.push(`/repositories/${repo.id}`)
    }

    const onEditClick = () => {
        history.push(`/repositories/${repo.id}/edit`)
    }

    const buttons = <>
        {canDelete ?
         <Button
             color={"Red"}
             icon={faTrash}
             onClick={deleteSelf}
             disabled={running}
         >
             {strings.delete}
         </Button>
                   : null}
        {canEdit ?
         <Button
             color={"Yellow"}
             icon={faPencilAlt}
             onClick={onEditClick}
             disabled={running}
         >
             {strings.edit}
         </Button>
                 : null}
        {canArchive ?
         <Button
             color={"Grey"}
             icon={faArchive}
             onClick={archiveSelf}
             disabled={running}
         >
             {strings.archive}
         </Button>
                    : null}
    </>

    return (
        <Summary
            icon={repo.is_active ? faFolderOpen : faFolder}
            title={repo.name}
            subtitle={repo.owner ? repo.owner.username : null}
            onClick={onRepoClick}
            upperLabel={strings.created}
            upperValue={repo.start ? new Date(repo.start).toLocaleString() : null}
            lowerLabel={strings.archived}
            lowerValue={repo.end ? new Date(repo.end).toLocaleString() : null}
            buttons={buttons}
            {...props}
        />
    )
}
