import React from "react"
import SummaryBase from "../base/summary/SummaryBase"
import SummaryLeft from "../base/summary/SummaryLeft"
import { faComment, faLocationArrow, faMapMarker, faMapMarkerAlt, faMapPin } from "@fortawesome/free-solid-svg-icons"
import SummaryText from "../base/summary/SummaryText"
import SummaryRight from "../base/summary/SummaryRight"


export default function SummaryTweet({ tweet, ...props }) {
    let icon
    if(tweet["location"]) {
        icon = faMapMarkerAlt
    }
    else if(tweet["place"]) {
        icon = faLocationArrow
    }
    else {
        icon = faComment
    }

    return (
        <SummaryBase {...props}>
            <SummaryLeft
                icon={icon}
                title={`@${tweet["poster"]}`}
                subtitle={new Date(tweet["insert_time"]).toLocaleString()}
                onClick={() => window.open(`https://twitter.com/${tweet["poster"]}/status/${tweet["snowflake"]}`)}
            />
            <SummaryText>
                {tweet.content}
            </SummaryText>
            <SummaryRight/>
        </SummaryBase>
    )
}
