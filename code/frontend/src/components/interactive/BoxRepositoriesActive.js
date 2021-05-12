import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import SummaryRepository from "./SummaryRepository"
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons"
import ContextUser from "../../contexts/ContextUser"
import Loading from "../base/Loading"
import BoxFullScrollable from "../base/BoxFullScrollable"


/**
 * A {@link BoxFull} listing all the user's active repositories.
 *
 * @param repositories - Array of repositories to display in the box.
 * @param archiveRepository - Function to be called when archive is pressed on a repository summary.
 * @param destroyRepository - Function to be called when delete is pressed on a repository summary.
 * @param running - If an action is currently running.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxRepositoriesActive({ repositories, archiveRepository, destroyRepository, running, ...props }) {
    const { user } = useContext(ContextUser)

    let contents
    if(repositories === null) {
        contents = <Loading/>
    }
    else if(repositories.length === 0) {
        contents = <i>There's nothing here.</i>
    }
    else {
        contents = repositories.map(repo => (
            <SummaryRepository
                key={repo["id"]}
                repo={repo}
                icon={faFolderOpen}
                archiveSelf={() => archiveRepository(repo["id"])}
                deleteSelf={() => destroyRepository(repo["id"])}
                canArchive={true}
                canEdit={true}
                canDelete={repo["owner"]["username"] === user["username"]}
                running={running}
            />
        ))
    }

    return (
        <BoxFullScrollable header={"Your active repositories"} {...props}>
            {contents}
        </BoxFullScrollable>
    )
}
