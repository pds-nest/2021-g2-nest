import React from "react"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryTweet from "./SummaryTweet"


export default function BoxRepositoryTweets({ tweets, ...props }) {
    // TODO: Translate this

    return (
        <BoxFullScrollable header={"Tweets"} {...props}>
            {tweets.map(tweet => <SummaryTweet key={tweet.snowflake} tweet={tweet}/>)}
        </BoxFullScrollable>
    )
}
