import React, { useMemo } from "react"
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

    const content = useMemo(
        () => {
            if(tweets.length === 0) {
                return <Empty/>
            }
            else {
                return tweets.map(tweet => <SummaryTweet key={tweet["snowflake"]} tweet={tweet}/>)
            }
        },
        [tweets]
    )


    return (
        <BoxFullScrollable header={strings.tweets} {...props}>
            {content}
        </BoxFullScrollable>
    )
}
