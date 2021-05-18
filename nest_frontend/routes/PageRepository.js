import React from "react"
import Style from "./PageRepository.module.css"
import classNames from "classnames"
import BoxRepositoryTweets from "../components/interactive/BoxRepositoryTweets"
import BoxWordcloud from "../components/interactive/BoxWordcloud"


export default function PageRepository({ className, ...props }) {
    const tweets = [
        {
            "conditions": [],
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere lacinia eleifend. Maecenas a neque augue. Nulla dapibus lobortis gravida. Quisque quis ultricies elit. Donec in tortor augue. Cras eget aliquam felis. Nunc tempor, ipsum in lobortis tristique, nunc ante velit.",
            "insert_time": "2021-05-18T18:56Z",
            "location": null,
            "place": "Casa mia",
            "poster": "USteffo",
            "snowflake": "1394698342282809344",
        },
    ]

    let preprocessedWords = {}
    for(const tweet of tweets) {
        if(!tweet.content) {
            continue
        }
        for(const word of tweet.content.toLowerCase().split(/\s+/)) {
            if(!preprocessedWords.hasOwnProperty(word)) {
                preprocessedWords[word] = 0
            }
            preprocessedWords[word] += 1
        }
    }

    let processedWords = []
    for(const word in preprocessedWords) {
        if(!preprocessedWords.hasOwnProperty(word)) {
            continue
        }
        processedWords.push({
            text: word,
            value: preprocessedWords[word]
        })
    }

    return (
        <div className={classNames(Style.PageRepository, className)} {...props}>
            <BoxRepositoryTweets className={Style.Tweets} tweets={tweets}/>
            <BoxWordcloud className={Style.Wordcloud} words={processedWords}/>
        </div>
    )
}
