import React, { useContext, useMemo } from "react"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import ContextLanguage from "../../contexts/ContextLanguage"
import BoxFullScrollable from "../base/BoxFullScrollable"


export default function BoxVisualizationStats({ tweets, words, totalTweetCount, ...props }) {
    const { strings } = useContext(ContextLanguage)
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

    return (
        <BoxFullScrollable header={strings.stats} {...props}>
            <FormLabelled>
                <FormLabel text={strings.totTweets}>
                    <b>{totalTweetCount}</b>
                </FormLabel>
                <FormLabel text={strings.dispTweets}>
                    <b>{tweetCount}</b>
                </FormLabel>
                <FormLabel text={strings.dispTweetsPerc}>
                    <b>{tweetPct.toFixed(2)}%</b>
                </FormLabel>
                <FormLabel text={strings.locTweets}>
                    <b>{tweetLocationCount}</b>
                </FormLabel>
                <FormLabel text={strings.locTweetsPerc}>
                    <b>{tweetLocationPct.toFixed(2)}%</b>
                </FormLabel>
                <FormLabel text={strings.contTweets}>
                    <b>{tweetContentCount}</b>
                </FormLabel>
                <FormLabel text={strings.contTweetsPerc}>
                    <b>{tweetContentPct.toFixed(2)}%</b>
                </FormLabel>
                <FormLabel text={strings.wordCount}>
                    <b>{wordCount}</b>
                </FormLabel>
                <FormLabel text={strings.wordPop}>
                    <b>{mostPopularWord}</b>
                </FormLabel>
                <FormLabel text={strings.imgTweets}>
                    <b>🚧</b>
                </FormLabel>
                <FormLabel text={strings.imgTweetsPerc}>
                    <b>🚧</b>
                </FormLabel>
                <FormLabel text={strings.postUniq}>
                    <b>{uniqueUsersCount}</b>
                </FormLabel>
                <FormLabel text={strings.postPop}>
                    <b>{mostActiveUser ? `${mostActiveUser.user} (${mostActiveUser.count} tweet${mostActiveUser.count === 1 ? "" : "s"})` : "❌"}</b>
                </FormLabel>
            </FormLabelled>
        </BoxFullScrollable>
    )
}
