import React from "react"
import SummaryBase from "../base/summary/SummaryBase"
import SummaryLeft from "../base/summary/SummaryLeft"
import { faComment, faMapPin } from "@fortawesome/free-solid-svg-icons"
import SummaryText from "../base/summary/SummaryText"
import SummaryRight from "../base/summary/SummaryRight"


export default function SummaryTweet({ tweet, ...props }) {
    let icon
    if(tweet.place) {
        icon = faMapPin
    }
    else {
        icon = faComment
    }

    return (
        <SummaryBase {...props}>
            <SummaryLeft
                icon={icon}
                title={`@${tweet.poster}`}
                subtitle={tweet.place}
                onClick={() => window.open(`https://twitter.com/${tweet.poster}/status/${tweet.snowflake}`)}
            />
            <SummaryText>
                {tweet.content}
            </SummaryText>
            <SummaryRight/>
        </SummaryBase>
    )
}
