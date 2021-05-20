import React from "react"
import BoxFull from "../base/BoxFull"
import BoxChart from "../base/BoxChart"


export default function BoxVisualizationChart({ tweets, ...props }) {
    // TODO: translate this
    const hours = [...Array(24).keys()].map(hour => hour.toString())
    const hourlyTweetCount = Array(24).fill(0)
    for(const tweet of tweets) {
        const insertDate = new Date(tweet["insert_time"])
        const insertHour = insertDate.getHours()
        console.log(insertHour)
        hourlyTweetCount[insertHour] += 1
    }


    return (
        <BoxChart
            header={"Hourly graph"}
            chartProps={{
                type: "bar",
                data: {
                    labels: hours.map(hour => hour.toString()),
                    datasets: [
                        {
                            label: "Tweets",
                            data: hourlyTweetCount,
                        }
                    ],
                }
            }}
            {...props}
        />
    )
}
