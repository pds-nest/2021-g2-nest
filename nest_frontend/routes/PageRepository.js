import React, { useMemo, useState } from "react"
import Style from "./PageRepository.module.css"
import classNames from "classnames"
import BoxRepositoryTweets from "../components/interactive/BoxRepositoryTweets"
import BoxWordcloud from "../components/interactive/BoxWordcloud"
import BoxHeader from "../components/base/BoxHeader"
import PickerVisualization from "../components/interactive/PickerVisualization"
import PickerFilter from "../components/interactive/PickerFilter"
import useBackendViewset from "../hooks/useBackendViewset"
import useBackendResource from "../hooks/useBackendResource"
import { faFolder, faFolderOpen, faTrash } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useParams } from "react-router"
import Loading from "../components/base/Loading"


export default function PageRepository({ className, ...props }) {
    const {id} = useParams()

    const [visualizationTab, setVisualizationTab] = useState("wordcloud")
    const [addFilterTab, setAddFilterTab] = useState("hashtag")

    const repositoryBr = useBackendResource(
        `/api/v1/repositories/${id}`,
        {
            retrieve: true,
            edit: true,
            destroy: true,
            action: false,
        }
    )
    const repository = repositoryBr.error ? null : repositoryBr.resource

    const tweetsBv = useBackendViewset(
        `/api/v1/repositories/${id}/tweets/`,
        "snowflake",
        {
            list: true,
            create: false,
            retrieve: false,
            edit: false,
            destroy: false,
            command: false,
            action: false,
        }
    )
    const tweets = tweetsBv.resources && tweetsBv.error ? [] : tweetsBv.resources

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

    let contents;
    if(!repositoryBr.firstLoad || !tweetsBv.firstLoad) {
        contents = <>
            <BoxHeader className={Style.Header}>
                <Loading/>
            </BoxHeader>
        </>
    }
    else if(repository === null) {
        console.debug("repositoryBr: ", repositoryBr, ", tweetsBv: ", tweetsBv)

        // TODO: Translate this!
        contents = <>
            <BoxHeader className={Style.Header}>
                <FontAwesomeIcon icon={faTrash}/> <i>This repository was deleted.</i>
            </BoxHeader>
        </>
    }
    else {
        contents = <>
            <BoxHeader className={Style.Header}>
                <FontAwesomeIcon icon={repository.is_active ? faFolderOpen : faFolder}/> {repository.name}
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
        </>
    }

    return (
        <div className={classNames(Style.PageRepository, className)} {...props}>
            {contents}
        </div>
    )
}
