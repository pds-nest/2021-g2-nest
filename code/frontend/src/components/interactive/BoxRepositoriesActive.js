import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import RepositorySummaryBase from "./RepositorySummaryBase"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import ContextUser from "../../contexts/ContextUser"


/**
 * A {@link BoxFull} listing all the user's active repositories.
 *
 * @param repositories - Array of repositories to display in the box.
 * @param refresh - Function that can be called to refresh the repositories list.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxRepositoriesActive({ repositories, refresh, ...props }) {
    const { user } = useContext(ContextUser)

    let contents
    if(repositories.length > 0) {
        contents = repositories.map(repo => (
            <RepositorySummaryBase
                key={repo["id"]}
                {...repo}
                icon={faSearch}
                refresh={refresh}
                canArchive={true}
                canEdit={true}
                canDelete={repo["owner"]["username"] === user["username"]}
            />
        ))
    }
    else {
        contents = <i>There's nothing here.</i>
    }

    return (
        <BoxFull header={"Your active repositories"} {...props}>
            {contents}
        </BoxFull>
    )
}
