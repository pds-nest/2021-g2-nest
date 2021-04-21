import React from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"
import BoxWithHeader from "../components/BoxWithHeader"


export default function PageRepositories({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            <BoxWithHeader header={"Your active repositories"} className={Style.ActiveRepositories}>
                a
            </BoxWithHeader>
            <BoxWithHeader header={"Your archived repositories"} className={Style.ArchivedRepositories}>
                b
            </BoxWithHeader>
        </div>
    )
}
