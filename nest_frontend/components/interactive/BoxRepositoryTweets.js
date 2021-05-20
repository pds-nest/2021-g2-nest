import React from "react"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryTweet from "./SummaryTweet"
import Empty from "./Empty"


export default function BoxRepositoryTweets({ tweets, ...props }) {
    // TODO: Translate this

    let content
    if(tweets.length === 0) {
        content = <Empty/>
    }
    else {
        content = tweets.map(tweet => <SummaryTweet key={tweet["snowflake"]} tweet={tweet}/>)
    }

    return (
        <BoxFullScrollable header={"Tweets"} {...props}>
            {content}
        </BoxFullScrollable>
    )
}
