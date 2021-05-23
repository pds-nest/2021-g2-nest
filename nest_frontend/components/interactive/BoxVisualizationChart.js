import React, { useContext, useMemo } from "react"
import BoxFull from "../base/BoxFull"
import BoxChart from "../base/BoxChart"
import Empty from "./Empty"
import ContextLanguage from "../../contexts/ContextLanguage"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


export default function BoxVisualizationChart({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const { tweets } = useContext(ContextRepositoryViewer)

    const chartProps = useMemo(
        () => {
            const hours = [...Array(24).keys()].map(hour => hour.toString())
            const hourlyTweetCount = Array(24).fill(0)
            for(const tweet of tweets) {
                if(!tweet["post_time"]) {
                    console.debug("Tweet ", tweet, " has no post time, skipping...")
                    continue
                }

                const insertDate = new Date(tweet["post_time"])
                const insertHour = insertDate.getHours()
                hourlyTweetCount[insertHour] += 1
            }

            return {
                type: "bar",
                data: {
                    labels: hours.map(hour => hour.toString()),
                    datasets: [
                        {
                            label: "Tweets",
                            data: hourlyTweetCount,
                        },
                    ],
                }
            }
        },
        [tweets]
    )

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
            chartProps={chartProps}
            {...props}
        />
    )
}
