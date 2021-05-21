import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import BoxChart from "../base/BoxChart"
import Empty from "./Empty"
import ContextLanguage from "../../contexts/ContextLanguage"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


export default function BoxVisualizationChart({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const { tweets } = useContext(ContextRepositoryViewer)

    const hours = [...Array(24).keys()].map(hour => hour.toString())
    const hourlyTweetCount = Array(24).fill(0)
    for(const tweet of tweets) {
        const insertDate = new Date(tweet["insert_time"])
        const insertHour = insertDate.getHours()
        hourlyTweetCount[insertHour] += 1
    }

    if(tweets.length === 0) {
        return (
            <BoxFull header={"Hourly graph"} {...props}>
                <Empty/>
            </BoxFull>
        )
    }

    return (
        <BoxChart
            header={strings.hourlyGraph}
            chartProps={{
                type: "bar",
                data: {
                    labels: hours.map(hour => hour.toString()),
                    datasets: [
                        {
                            label: "Tweets",
                            data: hourlyTweetCount,
                        },
                    ],
                },
            }}
            {...props}
        />
    )
}
