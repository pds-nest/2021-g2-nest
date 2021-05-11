import React, { useContext } from "react"
import Style from "./PageDashboard.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import RepositoryEditor from "../components/providers/RepositoryEditor"
import useBackendImmediately from "../hooks/useBackendImmediately"
import ContextUser from "../contexts/ContextUser"
import renderContents from "../utils/renderContents"
import { useParams } from "react-router"


export default function PageEdit({ className, ...props }) {
    const { id } = useParams()
    const { fetchDataAuth } = useContext(ContextUser)
    const repositoryRequest = useBackendImmediately(fetchDataAuth, "GET", `/api/v1/repositories/${id}`)
    const contents = renderContents(
        repositoryRequest,
        data => {
            console.debug("Data: ", data)
            return <RepositoryEditor className={Style.RepositoryEditor} {...data}/>
        },
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
