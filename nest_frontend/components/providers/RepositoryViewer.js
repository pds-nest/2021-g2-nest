import React  from "react"
import Style from "./RepositoryViewer.module.css"
import classNames from "classnames"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


export default function RepositoryViewer({
                                             id,
                                         }) {
    return (
        <ContextRepositoryViewer.Provider
            value={{
                id,

            }}
        >
            <div className={classNames(Style.RepositoryViewer, className)}>

            </div>
        </ContextRepositoryViewer.Provider>
    )
}
