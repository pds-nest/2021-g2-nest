import React from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"
import BoxRepositoriesActive from "../components/interactive/BoxRepositoriesActive"
import BoxRepositoriesArchived from "../components/interactive/BoxRepositoriesArchived"


export default function PageRepositories({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            <BoxRepositoriesActive/>
            <BoxRepositoriesArchived/>
        </div>
    )
}
