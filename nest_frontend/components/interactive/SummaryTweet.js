import React from "react"
import SummaryBase from "../base/summary/SummaryBase"
import SummaryLeft from "../base/summary/SummaryLeft"
import { faComment, faImage, faRetweet } from "@fortawesome/free-solid-svg-icons"
import SummaryText from "../base/summary/SummaryText"
import SummaryRight from "../base/summary/SummaryRight"


/**
 * A {@link SummaryBase} representing a tweet.
 *
 * @param tweet - The tweet to represent.
 * @param props - Additional props to pass to the summary.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SummaryTweet({ tweet, ...props }) {
    let icon
    if(tweet["image_url"]) {
        icon = faImage
    }
    else if(tweet["content"].startsWith("RT")) {
        icon = faRetweet
    }
    else {
        icon = faComment
    }

    return (
        <SummaryBase {...props}>
            <SummaryLeft
                icon={icon}
                title={`@${tweet["poster"]}`}
                subtitle={tweet["post_time"] ? new Date(tweet["post_time"]).toLocaleString() : null}
                onClick={() => window.open(`https://twitter.com/${tweet["poster"]}/status/${tweet["snowflake"]}`)}
            />
            <SummaryText>
                {tweet.content}
            </SummaryText>
            <SummaryRight/>
        </SummaryBase>
    )
}
