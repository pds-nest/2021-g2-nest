import React, { useMemo, useState } from "react"
import Style from "./PageRepository.module.css"
import classNames from "classnames"
import BoxRepositoryTweets from "../components/interactive/BoxRepositoryTweets"
import BoxWordcloud from "../components/interactive/BoxWordcloud"
import ButtonIconOnly from "../components/base/ButtonIconOnly"
import { faAt, faChartBar, faClock, faCloud, faHashtag, faMap, faMapPin } from "@fortawesome/free-solid-svg-icons"
import BoxFull from "../components/base/BoxFull"
import BoxHeader from "../components/base/BoxHeader"
import PickerVisualization from "../components/interactive/PickerVisualization"
import PickerFilter from "../components/interactive/PickerFilter"


export default function PageRepository({ className, ...props }) {
    const [visualizationTab, setVisualizationTab] = useState("wordcloud")
    const [addFilterTab, setAddFilterTab] = useState("hashtag")

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

    const words = useMemo(
        () => {
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
            return processedWords
        },
        [tweets]
    )



    return (
        <div className={classNames(Style.PageRepository, className)} {...props}>
            <BoxHeader className={Style.Header}>
                Repository Senza Nome
            </BoxHeader>

            <BoxRepositoryTweets
                className={Style.Tweets}
                tweets={tweets}
            />

            <PickerVisualization
                className={Style.VisualizationPicker}
                currentTab={visualizationTab}
                setTab={setVisualizationTab}
            />
            {visualizationTab === "wordcloud" ?
                <BoxWordcloud
                    className={Style.Wordcloud}
                    words={words}
                />
             : null}

            <PickerFilter
                className={Style.FilterPicker}
                currentTab={addFilterTab}
                setTab={setAddFilterTab}
            />
        </div>
    )
}
