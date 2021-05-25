import React from "react"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryAlert from "./SummaryAlert"
import useStrings from "../../hooks/useStrings"


export default function BoxAlerts({ alerts, destroy, running, ...props }) {
    const strings = useStrings()

    return (
        <BoxFullScrollable header={strings.alertTitle} {...props}>
            {alerts.map(alert => <SummaryAlert alert={alert} destroy={() => destroy(alert["id"])} running={running}/>)}
        </BoxFullScrollable>
    )
}
