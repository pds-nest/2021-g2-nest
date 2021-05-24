import React, { useContext } from "react"
import Style from "./PageRepositoryCreate.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import RepositoryEditor from "../components/providers/RepositoryEditor"
import ContextLanguage from "../contexts/ContextLanguage"


export default function PageRepositoryCreate({ children, className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <div className={classNames(Style.PageHome, className)} {...props}>
            <BoxHeader className={Style.Header}>
                {strings.dashboardTitle}
            </BoxHeader>
            <RepositoryEditor className={Style.RepositoryEditor}/>
        </div>
    )
}
