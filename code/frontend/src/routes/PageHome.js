import React from "react"
import Style from "./PageHome.module.css"
import classNames from "classnames"
import BoxHeaderOnly from "../components/BoxHeaderOnly"
import BoxWithHeader from "../components/BoxWithHeader"


export default function PageHome({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageHome, className)} {...props}>
            <BoxHeaderOnly className={Style.Header}>
                Create a new repository
            </BoxHeaderOnly>
            <BoxWithHeader className={Style.SearchByZone} header={"Search by zone"}>

            </BoxWithHeader>
            <BoxWithHeader className={Style.SearchByHashtags} header={"Search by hashtags"}>

            </BoxWithHeader>
            <BoxWithHeader className={Style.SearchByTimePeriod} header={"Search by time period"}>

            </BoxWithHeader>
            <BoxWithHeader className={Style.CreateDialog} header={"Create repository"}>

            </BoxWithHeader>
        </div>
    )
}
