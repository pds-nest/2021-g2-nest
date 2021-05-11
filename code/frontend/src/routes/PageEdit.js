import React, { useContext } from "react"
import Style from "./PageDashboard.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import RepositoryEditor from "../components/providers/RepositoryEditor"
import useBackendImmediately from "../hooks/useBackendImmediately"
import ContextUser from "../contexts/ContextUser"
import renderContents from "../utils/renderContents"


export default function PageEdit({ id, className, ...props }) {
    const { fetchDataAuth } = useContext(ContextUser)
    const repositoryRequest = useBackendImmediately(fetchDataAuth, "GET", `/api/v1/repositories/${id}`)
    const contents = renderContents(
        repositoryRequest,
        data => <RepositoryEditor className={Style.RepositoryEditor} {...data}/>,
    )

    return (
        <div className={classNames(Style.PageHome, className)} {...props}>
            <BoxHeader className={Style.Header}>
                Edit repository
            </BoxHeader>
            {contents}
        </div>
    )
}
