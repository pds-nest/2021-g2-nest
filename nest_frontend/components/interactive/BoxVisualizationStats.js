import React, { useMemo } from "react"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import BoxFullScrollable from "../base/BoxFullScrollable"


export default function BoxVisualizationStats({ tweets, words, totalTweetCount, ...props }) {
    const tweetCount = useMemo(
        () => tweets.length,
        [tweets],
    )

    const tweetPct = useMemo(
        () => tweetCount / totalTweetCount * 100,
        [tweetCount, totalTweetCount],
    )

    const tweetLocationCount = useMemo(
        () => tweets.filter(tweet => tweet.location).length,
        [tweets],
    )

    const tweetLocationPct = useMemo(
        () => tweetLocationCount / tweetCount * 100,
        [tweetLocationCount, tweetCount],
    )

    const tweetContent = useMemo(
        () => tweets.filter(tweet => tweet.content),
        [tweets],
    )

    const tweetContentCount = useMemo(
        () => tweetContent.length,
        [tweetContent],
    )

    const tweetContentPct = useMemo(
        () => tweetContentCount / tweetCount * 100,
        [tweetContentCount, tweetCount],
    )

    const wordCount = useMemo(
        () => {
            if(words.length === 0) return 0
            return words.map(word => word.value).reduce((a, b) => a + b)
        },
        [words]
    )

    const mostPopularWord = useMemo(
        () => {
            if(words.length === 0) return "❌"
            return words.sort((wa, wb) => {
                if(wa.value > wb.value) {
                    return -1
                }
                if(wa.value < wb.value) {
                    return 1
                }
                return 0
            })[0].text
        },
        [words],
    )

    const users = useMemo(
        () => tweets.map(tweet => tweet.poster),
        [tweets],
    )

    const uniqueUsers = useMemo(
        () => [...new Set(users)],
        [users],
    )

    const uniqueUsersCount = useMemo(
        () => uniqueUsers.length,
        [uniqueUsers],
    )

    const mostActiveUser = useMemo(
        () => {
            if(uniqueUsers.length === 0) {
                return null
            }
            return uniqueUsers.map(user => {
                return {
                    user: user,
                    count: tweets.filter(tweet => tweet.poster === user).length,
                }
            }).sort((a, b) => {
                if(a.count > b.count) {
                    return -1
                }
                if(a.count < b.count) {
                    return 1
                }
                return 0
            })[0]
        },
        [uniqueUsers, tweets],
    )

    // TODO: missing stats

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
                <FormLabel text={"Unique posters"}>
                    <b>{uniqueUsersCount}</b>
                </FormLabel>
                <FormLabel text={"Most active poster"}>
                    <b>{mostActiveUser ? `${mostActiveUser.user} (${mostActiveUser.count} tweet${mostActiveUser.count === 1 ? "" : "s"})` : "❌"}</b>
                </FormLabel>
            </FormLabelled>
        </BoxFullScrollable>
    )
}
