import React from "react"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryTweet from "./SummaryTweet"
import Empty from "./Empty"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"


/**
 * A {@link BoxFullScrollable} rendering all the tweets currently displayed in a RepositoryViewer as
 * {@link SummaryTweet}s.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxRepositoryTweets({ ...props }) {
    const strings = useStrings()
    const { tweets } = useRepositoryViewer()

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
