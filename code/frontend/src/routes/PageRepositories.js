import React from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"
import BoxRepositoriesActive from "../components/BoxRepositoriesActive"
import BoxRepositoriesArchived from "../components/BoxRepositoriesArchived"


export default function PageRepositories({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            <BoxRepositoriesActive/>
            <BoxRepositoriesArchived/>
        </div>
    )
}
