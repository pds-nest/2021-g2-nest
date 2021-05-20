import React, { useMemo } from "react"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import BoxFullScrollable from "../base/BoxFullScrollable"
import tokenizeTweetWords from "../../utils/tokenizeTweetWords"


export default function BoxVisualizationStats({ tweets, totalTweetCount, ...props }) {

    const words = useMemo(
        () => tokenizeTweetWords(tweets),
        [tweets]
    )

    const tweetCount = tweets.length
    const tweetPct = tweetCount / totalTweetCount * 100
    const tweetLocationCount = tweets.filter(tweet => tweet.location).length
    const tweetLocationPct = tweetLocationCount / tweetCount * 100
    const tweetContent = tweets.filter(tweet => tweet.content)
    const tweetContentCount = tweetContent.length
    const tweetContentPct = tweetContentCount / tweetCount * 100
    const wordCount = words.map(word => word.value).reduce((a, b) => a+b)
    const mostPopularWord = words.sort((wa, wb) => {
        if(wa.value > wb.value) return -1
        if(wa.value < wb.value) return 1
        return 0
    })[0].text
    const users = [...new Set(tweets.map(tweet => tweet.poster))]
    const usersCount = users.length

    // TODO: tweets with picture count
    // TODO: tweets with picture pct

    // TODO: translate this
    return (
        <BoxFullScrollable header={"Stats"} {...props}>
            <FormLabelled>
                <FormLabel text={"Total tweets"}>
                    <b>{totalTweetCount}</b>
                </FormLabel>
                <FormLabel text={"Displayed tweets"}>
                    <b>{tweetCount}</b>
                </FormLabel>
                <FormLabel text={"% of displayed tweets"}>
                    <b>{tweetPct.toFixed(2)}%</b>
                </FormLabel>
                <FormLabel text={"Tweets with location"}>
                    <b>{tweetLocationCount}</b>
                </FormLabel>
                <FormLabel text={"% of tweets with location"}>
                    <b>{tweetLocationPct.toFixed(2)}%</b>
                </FormLabel>
                <FormLabel text={"Tweets with content"}>
                    <b>{tweetContentCount}</b>
                </FormLabel>
                <FormLabel text={"% of tweets with content"}>
                    <b>{tweetContentPct.toFixed(2)}%</b>
                </FormLabel>
                <FormLabel text={"Word count"}>
                    <b>{wordCount}</b>
                </FormLabel>
                <FormLabel text={"Most popular word"}>
                    <b>{mostPopularWord}</b>
                </FormLabel>
                <FormLabel text={"Tweets with image"}>
                    <b>🚧</b>
                </FormLabel>
                <FormLabel text={"% of tweets with image"}>
                    <b>🚧</b>
                </FormLabel>
                <FormLabel text={"Users count"}>
                    <b>{usersCount}</b>
                </FormLabel>
            </FormLabelled>
        </BoxFullScrollable>
    )
}
