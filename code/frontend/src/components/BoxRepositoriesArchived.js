import React, { useContext } from "react"
import BoxFull from "./BoxFull"
import ContextUser from "../contexts/ContextUser"
import useData from "../hooks/useData"
import RepositorySummaryBase from "./RepositorySummaryBase"
import Loading from "./Loading"
import BoxAlert from "./BoxAlert"


export default function BoxRepositoriesArchived({ ...props }) {
    const {fetchDataAuth} = useContext(ContextUser)
    const {data, started, loading, error} = useData(fetchDataAuth, "GET", "/api/repository/list", {
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
            contents = repositories.map(repo => <RepositorySummaryBase {...repo}/>)
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
