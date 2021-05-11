import React, { useContext } from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"
import BoxRepositoriesActive from "../components/interactive/BoxRepositoriesActive"
import BoxRepositoriesArchived from "../components/interactive/BoxRepositoriesArchived"
import useBackendImmediately from "../hooks/useBackendImmediately"
import ContextUser from "../contexts/ContextUser"
import BoxAlert from "../components/base/BoxAlert"
import Loading from "../components/base/Loading"


export default function PageRepositories({ children, className, ...props }) {
    const { fetchDataAuth } = useContext(ContextUser)
    const { data, error, fetchNow: refresh } = useBackendImmediately(fetchDataAuth, "GET", "/api/v1/repositories/")

    let contents
    if(error) {
        contents = <BoxAlert color={"Red"}>{error}</BoxAlert>
    }
    else if(data) {
        const repositories = [...data["owner"], ...data["spectator"]]
        const active = repositories.filter(r => r.is_active)
        const archived = repositories.filter(r => !r.is_active)
        contents = <>
            <BoxRepositoriesActive repositories={active} refresh={refresh}/>
            <BoxRepositoriesArchived repositories={archived} refresh={refresh}/>
        </>
    }
    else {
        contents = <Loading/>
    }

    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            {contents}
        </div>
    )
}
