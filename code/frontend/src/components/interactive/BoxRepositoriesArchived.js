import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import ContextUser from "../../contexts/ContextUser"
import RepositorySummaryBase from "./RepositorySummaryBase"
import Loading from "../base/Loading"
import BoxAlert from "../base/BoxAlert"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import useDataImmediately from "../../hooks/useDataImmediately"


/**
 * A {@link BoxFull} listing all the user's archived repositories.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxRepositoriesArchived({ ...props }) {
    const {user, fetchDataAuth} = useContext(ContextUser)
    const {data, started, loading, error} = useDataImmediately(fetchDataAuth, "GET", "/api/v1/repositories/", {
        "onlyDead": true,
    })

    let contents;
    if(!started || loading) {
        contents = <Loading/>
    }
    else if(error) {
        contents = <BoxAlert color={"Red"}>{error.toString()}</BoxAlert>
    }
    else {
        let repositories = [...data["owner"], ...data["spectator"]]
        if(repositories.length > 0) {
            contents = repositories.map(repo => (
                <RepositorySummaryBase
                    {...repo}
                    icon={faSearch}
                    canArchive={true}
                    canEdit={false}
                    canDelete={repo["owner"]["username"] === user["username"]}
                />
            ))
        }
        else {
            contents = <i>There's nothing here.</i>
        }
    }

    return (
        <BoxFull header={"Your archived repositories"} {...props}>
            {contents}
        </BoxFull>
    )
}
