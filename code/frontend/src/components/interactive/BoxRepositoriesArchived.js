import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import ContextUser from "../../contexts/ContextUser"
import SummaryRepository from "./SummaryRepository"
import { faSearch } from "@fortawesome/free-solid-svg-icons"


/**
 * A {@link BoxFull} listing all the user's archived repositories.
 *
 * @param repositories - Array of repositories to display in the box.
 * @param refresh - Function that can be called to refresh the repositories list.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxRepositoriesArchived({ repositories, refresh, ...props }) {
    const { user } = useContext(ContextUser)

    let contents
    if(repositories.length > 0) {
        contents = repositories.map(repo => (
            <SummaryRepository
                key={repo["id"]}
                repo={repo}
                icon={faSearch}
                refresh={refresh}
                canArchive={false}
                canEdit={false}
                canDelete={repo["owner"]["username"] === user["username"]}
            />
        ))
    }
    else {
        contents = <i>There's nothing here.</i>
    }

    return (
        <BoxFull header={"Your archived repositories"} {...props}>
            {contents}
        </BoxFull>
    )
}
