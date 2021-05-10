import React, { useContext } from "react"
import Style from "./PageDashboard.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import RepositoryEditor from "../components/providers/RepositoryEditor"
import useDataImmediately from "../hooks/useDataImmediately"
import ContextUser from "../contexts/ContextUser"
import BoxAlert from "../components/base/BoxAlert"
import RepositorySummaryBase from "../components/interactive/RepositorySummaryBase"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Loading from "../components/base/Loading"
import BoxFull from "../components/base/BoxFull"


export default function PageEdit({ id, className, ...props }) {
    const {fetchDataAuth} = useContext(ContextUser)
    const {data, error} = useDataImmediately(fetchDataAuth, "GET", `/api/v1/repositories/${id}`)

    let contents;
    if(error) {
        contents = <BoxAlert color={"Red"}>{error.toString()}</BoxAlert>
    }
    else if(data) {
        contents = <RepositoryEditor className={Style.RepositoryEditor} {...data}/>
    }
    else {
        contents = <Loading/>
    }

    return (
        <div className={classNames(Style.PageHome, className)} {...props}>
            <BoxHeader className={Style.Header}>
                Edit repository
            </BoxHeader>
            {contents}
        </div>
    )
}
