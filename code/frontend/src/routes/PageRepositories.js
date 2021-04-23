import React from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"
import BoxFull from "../components/BoxFull"


export default function PageRepositories({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            <BoxFull header={"Your active repositories"} className={Style.ActiveRepositories}>
                a
            </BoxFull>
            <BoxFull header={"Your archived repositories"} className={Style.ArchivedRepositories}>
                b
            </BoxFull>
        </div>
    )
}
