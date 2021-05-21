import React, { useContext } from "react"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryTweet from "./SummaryTweet"
import ContextLanguage from "../../contexts/ContextLanguage"
import Empty from "./Empty"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


export default function BoxRepositoryTweets({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const {tweets} = useContext(ContextRepositoryViewer)

    let content
    if(tweets.length === 0) {
        content = <Empty/>
    }
    else {
        content = tweets.map(tweet => <SummaryTweet key={tweet["snowflake"]} tweet={tweet}/>)
    }

    return (
        <BoxFullScrollable header={strings.tweets} {...props}>
            {content}
        </BoxFullScrollable>
    )
}
