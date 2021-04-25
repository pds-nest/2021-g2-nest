import React from "react"
import Style from "./PageAlerts.module.css"
import classNames from "classnames"
import BoxFull from "../components/BoxFull"


export default function PageAlerts({ children, className, ...props }) {
    return (
        <div className={classNames(Style.PageAlerts, className)} {...props}>
            <BoxFull header={"Your alerts"} className={Style.YourAlerts}>
                🚧 Not implemented.
            </BoxFull>
            <BoxFull header={"Create new alert"} className={Style.CreateAlert}>
                🚧 Not implemented.
            </BoxFull>
        </div>
    )
}
