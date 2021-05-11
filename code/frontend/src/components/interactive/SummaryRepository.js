import React, { useContext } from "react"
import Style from "./RepositorySummaryBase.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "../base/Button"
import { faArchive, faFolder, faFolderOpen, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router"
import useBackend from "../../hooks/useBackend"
import ContextUser from "../../contexts/ContextUser"


/**
 * A long line representing a repository in a list.
 *
 * @param repo - The repository object.
 * @param refresh - Function that can be called to refresh the repositories list.
 * @param canDelete - If the Delete button should be displayed or not.
 * @param canEdit - If the Edit button should be displayed or not.
 * @param canArchive - If the Archive button should be displayed or not.
 * @param className - Additional class(es) to be added to the outer box.
 * @param props - Additional props to pass to the outer box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SummaryRepository(
    { repo, refresh, canDelete, canEdit, canArchive, className, ...props },
) {
    const { fetchDataAuth } = useContext(ContextUser)
    const history = useHistory()
    const { fetchNow: archiveThis } = useBackend(fetchDataAuth, "PATCH", `/api/v1/repositories/${repo.id}`, { "close": true })
    const { fetchNow: unarchiveThis } = useBackend(fetchDataAuth, "PATCH", `/api/v1/repositories/${repo.id}`, { "open": true })
    const { fetchNow: deletThis } = useBackend(fetchDataAuth, "DELETE", `/api/v1/repositories/${repo.id}`)

    const onEditClick = () => {
        history.push(`/repositories/${repo.id}/edit`)
    }

    const onArchiveClick = async () => {
        await archiveThis()
        await refresh()
    }

    const onUnarchiveClick = async () => {
        await unarchiveThis()
        await refresh()
    }

    const onDeleteClick = async () => {
        await deletThis()
        await refresh()
    }

    return (
        <div className={classNames(Style.RepositorySummary, className)} {...props}>
            <div className={Style.Left}>
                <div className={Style.IconContainer}>
                    <FontAwesomeIcon
                        icon={repo.is_active ? faFolderOpen : faFolder}
                    />
                </div>
                <div className={Style.Title}>
                    {repo.name}
                </div>
                <div className={Style.Author}>
                    {repo.owner.username}
                </div>
            </div>
            <div className={Style.Middle}>
                <div className={classNames(Style.MiddleLabel, Style.MiddleTop)}>
                    Start:
                </div>
                <div className={classNames(Style.MiddleValue, Style.MiddleTop)}>
                    {repo.start}
                </div>
                <div className={classNames(Style.MiddleLabel, Style.MiddleBot)}>
                    End:
                </div>
                <div className={classNames(Style.MiddleValue, Style.MiddleBot)}>
                    {repo.end}
                </div>
            </div>
            <div className={Style.Right}>
                {canDelete ?
                 <Button
                     color={"Red"}
                     icon={faTrash}
                     onClick={onDeleteClick}
                 >
                     Delete
                 </Button>
                           : null}
                {canEdit ?
                 <Button
                     color={"Yellow"}
                     icon={faPencilAlt}
                     onClick={onEditClick}
                 >
                     Edit
                 </Button>
                         : null}
                {canArchive ?
                 <Button
                     color={"Grey"}
                     icon={faArchive}
                     onClick={repo.is_active ? onArchiveClick : onUnarchiveClick}
                 >
                     {repo.is_active ? "Archive" : "Unarchive"}
                 </Button>
                            : null}
            </div>
        </div>
    )
}
