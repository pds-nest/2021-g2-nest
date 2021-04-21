import React from "react"
import Style from "./PageAlerts.module.css"
import classNames from "classnames"
import BoxWithHeader from "../components/BoxWithHeader"


export default function PageAlerts({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageAlerts, className)} {...props}>
            <BoxWithHeader header={"Your alerts"} className={Style.YourAlerts}>
                a
            </BoxWithHeader>
            <BoxWithHeader header={"Create new alert"} className={Style.CreateAlert}>
                b
            </BoxWithHeader>
        </div>
    )
}
