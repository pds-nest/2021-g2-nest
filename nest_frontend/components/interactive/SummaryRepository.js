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
 * A {@link SummaryBase} representing a repository.
 *
 * @param repo - The repository to display.
 * @param view - Function with no parameters to call when the view repository button is clicked.
 * @param archive - Function with no parameters to call when the archive repository button is clicked.
 * @param edit - Function with no parameters to call when the edit repository button is clicked.
 * @param destroy - Function with no parameters to call when the delete repository button is clicked.
 * @param running - If an action is running on the viewset.
 * @param className - Additional class(es) to append to the summary.
 * @param props - Additional props to pass to the summary.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SummaryRepository(
    { repo, view, archive, edit, destroy, running, className, ...props },
) {
    const { strings } = useContext(ContextLanguage)

    return (
        <SummaryBase {...props}>
            <SummaryLeft
                icon={repo.is_active ? faFolderOpen : faFolder}
                title={repo.name}
                subtitle={repo.owner ? repo.owner.username : null}
                onClick={view}
            />

            <SummaryLabels
                upperLabel={strings.created}
                upperValue={repo.start ? new Date(repo.start).toLocaleString() : null}
                lowerLabel={strings.archived}
                lowerValue={repo.end ? new Date(repo.end).toLocaleString() : null}
            />

            {destroy ?
                <SummaryButton
                    color={"Red"}
                    icon={faTrash}
                    onClick={() => destroy(repo["id"])}
                    disabled={running}
                >
                    {strings.delete}
                </SummaryButton>
            : null}

            {archive ?
                <SummaryButton
                    color={"Grey"}
                    icon={faArchive}
                    onClick={() => archive(repo["id"])}
                    disabled={running}
                >
                    {strings.archive}
                </SummaryButton>
            : null}

            {edit ?
                <SummaryButton
                    color={"Yellow"}
                    icon={faPencilAlt}
                    onClick={() => edit(repo["id"])}
                    disabled={running}
                >
                    {strings.edit}
                </SummaryButton>
            : null}

            <SummaryRight/>
        </SummaryBase>
    )
}