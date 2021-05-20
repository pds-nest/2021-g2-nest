import React, { useContext, useMemo, useState } from "react"
import Style from "./PageRepository.module.css"
import classNames from "classnames"
import BoxRepositoryTweets from "../components/interactive/BoxRepositoryTweets"
import BoxHeader from "../components/base/BoxHeader"
import PickerVisualization from "../components/interactive/PickerVisualization"
import PickerFilter from "../components/interactive/PickerFilter"
import useBackendViewset from "../hooks/useBackendViewset"
import useBackendResource from "../hooks/useBackendResource"
import { faFolder, faFolderOpen, faTrash } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { useParams } from "react-router"
import Loading from "../components/base/Loading"
import BoxVisualizationStats from "../components/interactive/BoxVisualizationStats"
import BoxVisualizationGraph from "../components/interactive/BoxVisualizationGraph"
import BoxVisualizationMap from "../components/interactive/BoxVisualizationMap"
import BoxVisualizationWordcloud from "../components/interactive/BoxVisualizationWordcloud"
import BoxFull from "../components/base/BoxFull"
import ContextLanguage from "../contexts/ContextLanguage"
import tokenizeTweetWords from "../utils/countTweetWords"
import countTweetWords from "../utils/countTweetWords"
import objectToWordcloudFormat from "../utils/objectToWordcloudFormat"


export default function PageRepository({ className, ...props }) {
    const {id} = useParams()
    const {strings} = useContext(ContextLanguage)

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
        () => objectToWordcloudFormat(countTweetWords(tweets)),
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
                <BoxVisualizationWordcloud
                    className={Style.Wordcloud}
                    tweets={tweets}
                    words={words}
                />
            : null}
            {visualizationTab === "histogram" ?
                <BoxVisualizationGraph
                    className={Style.Wordcloud}
                    tweets={tweets}
                />
            : null}
            {visualizationTab === "map" ?
                <BoxVisualizationMap
                    className={Style.Wordcloud}
                    tweets={tweets}
                />
            : null}
            {visualizationTab === "stats" ?
                <BoxVisualizationStats
                    className={Style.Wordcloud}
                    tweets={tweets}
                    words={words}
                    totalTweetCount={tweets.length}
                />
            : null}

            <PickerFilter
                className={Style.FilterPicker}
                currentTab={addFilterTab}
                setTab={setAddFilterTab}
            />

            <BoxFull header={strings.notImplemented} className={Style.Filters}>
                {strings.notImplemented}
            </BoxFull>

            <BoxFull header={strings.notImplemented} className={Style.AddFilter}>
                {strings.notImplemented}
            </BoxFull>
        </>
    }

    return (
        <div className={classNames(Style.PageRepository, className)} {...props}>
            {contents}
        </div>
    )
}
