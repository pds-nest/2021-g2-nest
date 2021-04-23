import React from "react"
import Style from "./PageAlerts.module.css"
import classNames from "classnames"
import BoxFull from "../components/BoxFull"


export default function PageAlerts({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageAlerts, className)} {...props}>
            <BoxFull header={"Your alerts"} className={Style.YourAlerts}>
                a
            </BoxFull>
            <BoxFull header={"Create new alert"} className={Style.CreateAlert}>
                b
            </BoxFull>
        </div>
    )
}
