import React, { useContext } from "react"
import BoxFullScrollable from "../base/BoxFullScrollable"
import Loading from "../base/Loading"
import SummaryRepository from "./SummaryRepository"
import Empty from "./Empty"
import ContextUser from "../../contexts/ContextUser"


/**
 * A {@link BoxFullScrollable} listing some repositories.
 *
 * @param repositories - The repositories to list.
 * @param view - Function with a single "id" parameter to call when the view repository button is clicked.
 * @param alerts - Function with a single "id" parameter to call when the alerts button is clicked.
 * @param archive - Function with a single "id" parameter to call when the archive repository button is clicked.
 * @param edit - Function with a single "id" parameter to call when the edit repository button is clicked.
 * @param destroy - Function with a single "id" parameter to call when the delete repository button is clicked.
 * @param firstLoad - If the repositories are loading and a loading message should be displayed.
 * @param running - If an action is running on the viewset.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxRepositories(
    {
        repositories,
        view,
        alerts,
        share,
        archive,
        edit,
        destroy,
        loading,
        running,
        ...props
    })
{
    const {user} = useContext(ContextUser)

    let contents
    if(loading) {
        contents = <Loading/>
    }
    else if(repositories.length === 0) {
        contents = <Empty/>
    }
    else {
        contents = repositories.map(repo => (
            <SummaryRepository
                key={repo["id"]}
                repo={repo}
                view={view ? () => view(repo["id"]) : null}
                alerts={(alerts && user["email"] === repo["owner"]["email"]) ? () => alerts(repo["id"]) : null}
                share={(share && user["email"] === repo["owner"]["email"]) ? () => share(repo["id"]) : null}
                archive={(archive && user["email"] === repo["owner"]["email"]) ? () => archive(repo["id"]) : null}
                edit={(edit && user["email"] === repo["owner"]["email"]) ? () => edit(repo["id"]) : null}
                destroy={(destroy && user["email"] === repo["owner"]["email"]) ? () => destroy(repo["id"]) : null}
                running={running}
            />
        ))
    }

    return (
        <BoxFullScrollable {...props}>
            {contents}
        </BoxFullScrollable>
    )
}
