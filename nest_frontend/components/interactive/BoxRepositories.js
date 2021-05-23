import React from "react"
import BoxFullScrollable from "../base/BoxFullScrollable"
import Loading from "../base/Loading"
import SummaryRepository from "./SummaryRepository"
import Empty from "./Empty"


/**
 * A {@link BoxFullScrollable} listing some repositories.
 *
 * @param repositories - The repositories to list.
 * @param view - Function with a single "id" parameter to call when the view repository button is clicked.
 * @param archive - Function with a single "id" parameter to call when the archive repository button is clicked.
 * @param edit - Function with a single "id" parameter to call when the edit repository button is clicked.
 * @param destroy - Function with a single "id" parameter to call when the delete repository button is clicked.
 * @param firstLoad - If the repositories are loading and a loading message should be displayed.
 * @param running - If an action is running on the viewset.
 * @param className - Additional class(es) to append to the box.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxRepositories(
    {
        repositories,
        view,
        share,
        archive,
        edit,
        destroy,
        loading,
        running,
        className,
        ...props
    })
{
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
                share={share ? () => share(repo["id"]) : null}
                archive={archive ? () => archive(repo["id"]) : null}
                edit={edit ? () => edit(repo["id"]) : null}
                destroy={destroy ? () => destroy(repo["id"]) : null}
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
