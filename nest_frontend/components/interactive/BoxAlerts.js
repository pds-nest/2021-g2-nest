import React, { useMemo } from "react"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryAlert from "./SummaryAlert"
import useStrings from "../../hooks/useStrings"
import Empty from "./Empty"


export default function BoxAlerts({ alerts, destroy, running, ...props }) {
    const strings = useStrings()

    const content = useMemo(
        () => {
            if(alerts.length === 0) {
                return <Empty/>
            }

            return alerts.map(alert => (
                <SummaryAlert alert={alert} destroy={() => destroy(alert["id"])} key={alert["id"]} running={running}/>
            ))
        },
        [alerts, running, destroy]
    )

    return (
        <BoxFullScrollable header={strings.alertTitle} {...props}>
            {content}
        </BoxFullScrollable>
    )
}
