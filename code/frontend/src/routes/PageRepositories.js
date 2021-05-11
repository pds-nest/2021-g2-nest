import React, { useContext } from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"
import BoxRepositoriesActive from "../components/interactive/BoxRepositoriesActive"
import BoxRepositoriesArchived from "../components/interactive/BoxRepositoriesArchived"
import useBackendImmediately from "../hooks/useBackendImmediately"
import ContextUser from "../contexts/ContextUser"
import renderContents from "../utils/renderContents"


export default function PageRepositories({ children, className, ...props }) {
    const { fetchDataAuth } = useContext(ContextUser)
    const repositoryRequest = useBackendImmediately(fetchDataAuth, "GET", "/api/v1/repositories/")
    const contents = renderContents(
        repositoryRequest,
        data => {
            const repositories = [...data["owner"], ...data["spectator"]]
            const active = repositories.filter(r => r.is_active)
            const archived = repositories.filter(r => !r.is_active)
            return <>
                <BoxRepositoriesActive repositories={active} refresh={repositoryRequest.fetchNow}/>
                <BoxRepositoriesArchived repositories={archived} refresh={repositoryRequest.fetchNow}/>
            </>
        },
    )

    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            {contents}
        </div>
    )
}
