import React, { useContext, useMemo, useState } from "react"
import Style from "./RepositoryViewer.module.css"
import classNames from "classnames"
import ContextLanguage from "../../contexts/ContextLanguage"
import useBackendResource from "../../hooks/useBackendResource"
import useBackendViewset from "../../hooks/useBackendViewset"
import objectToWordcloudFormat from "../../utils/objectToWordcloudFormat"
import countTweetWords from "../../utils/countTweetWords"
import BoxHeader from "../base/BoxHeader"
import Loading from "../base/Loading"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder, faFolderOpen, faTrash } from "@fortawesome/free-solid-svg-icons"
import BoxRepositoryTweets from "../interactive/BoxRepositoryTweets"
import PickerVisualization from "../interactive/PickerVisualization"
import BoxVisualizationWordcloud from "../interactive/BoxVisualizationWordcloud"
import BoxVisualizationChart from "../interactive/BoxVisualizationChart"
import BoxVisualizationMap from "../interactive/BoxVisualizationMap"
import BoxVisualizationStats from "../interactive/BoxVisualizationStats"
import PickerFilter from "../interactive/PickerFilter"
import useArrayState from "../../hooks/useArrayState"
import BoxFilters from "../interactive/BoxFilters"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"
import BoxFilterContains from "../interactive/BoxFilterContains"
import BoxFilterUser from "../interactive/BoxFilterUser"
import BoxFilterHashtag from "../interactive/BoxFilterHashtag"
import BoxFilterLocation from "../interactive/BoxFilterLocation"
import useMapAreaState from "../../hooks/useMapAreaState"
import BoxFilterDatetime from "../interactive/BoxFilterDatetime"
import BoxFilterHasPlace from "../interactive/BoxFilterHasPlace"
import BoxFilterHasImage from "../interactive/BoxFilterHasImage"


export default function RepositoryViewer({ id, className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    // State
    const [visualizationTab, setVisualizationTab] = useState("stats")
    const [filterTab, setFilterTab] = useState("contains")
    const {
        value: filters,
        setValue: setFilters,
        appendValue: appendFilter,
        spliceValue: spliceFilter,
        removeValue: removeFilter,
    } = useArrayState([])

    // FIXME: this has a severe performance impact, investigate
    const mapViewHook = useMapAreaState()

    // Repository
    const repositoryBr = useBackendResource(
        `/api/v1/repositories/${id}`,
        {
            retrieve: true,
            edit: true,
            destroy: true,
            action: false,
        },
    )
    const repository = repositoryBr.error ? null : repositoryBr.resource


    // Tweets
    const rawTweetsBv = useBackendViewset(
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
        },
    )
    const rawTweets = rawTweetsBv.resources && rawTweetsBv.error ? [] : rawTweetsBv.resources


    // Filtering
    let tweets = rawTweets
    for(const filter of filters) {
        tweets = tweets.filter(tweet => filter.exec(tweet))
    }


    // Words
    const words = useMemo(
        () => objectToWordcloudFormat(countTweetWords(tweets)),
        [tweets],
    )


    let contents
    if(!repositoryBr.firstLoad || !rawTweetsBv.firstLoad) {
        contents = <>
            <BoxHeader className={Style.Header}>
                <Loading/>
            </BoxHeader>
        </>
    }
    else if(repository === null) {
        contents = <>
            <BoxHeader className={Style.Header}>
                <FontAwesomeIcon icon={faTrash}/> <i>{strings.repoDeleted}</i>
            </BoxHeader>
        </>
    }
    else {
        contents = <>
            <BoxHeader className={Style.Header}>
                <FontAwesomeIcon icon={repository.is_active ? faFolderOpen : faFolder}/> {repository.name}
            </BoxHeader>

            <BoxRepositoryTweets className={Style.Tweets}/>
            <PickerVisualization className={Style.VisualizationPicker}/>
            {visualizationTab === "wordcloud" ? <BoxVisualizationWordcloud className={Style.Visualization}/> : null}
            {visualizationTab === "chart" ? <BoxVisualizationChart className={Style.Visualization}/> : null}
            {visualizationTab === "map" ? <BoxVisualizationMap className={Style.Visualization}/> : null}
            {visualizationTab === "stats" ? <BoxVisualizationStats className={Style.Visualization}/> : null}

            <BoxFilters className={Style.Filters}/>
            <PickerFilter className={Style.FilterPicker}/>
            {filterTab === "contains" ? <BoxFilterContains className={Style.AddFilter}/> : null}
            {filterTab === "hashtag" ? <BoxFilterHashtag className={Style.AddFilter}/> : null}
            {filterTab === "user" ? <BoxFilterUser className={Style.AddFilter}/> : null}
            {filterTab === "image" ? <BoxFilterHasImage className={Style.AddFilter}/> : null}
            {filterTab === "time" ? <BoxFilterDatetime className={Style.AddFilter}/> : null}
            {filterTab === "place" ? <BoxFilterHasPlace className={Style.AddFilter}/> : null}
            {filterTab === "location" ? <BoxFilterLocation className={Style.AddFilter}/> : null}
        </>
    }

    return (
        <ContextRepositoryViewer.Provider
            value={{
                visualizationTab,
                setVisualizationTab,
                filterTab,
                setFilterTab,
                filters,
                setFilters,
                appendFilter,
                spliceFilter,
                removeFilter,
                repositoryBr,
                repository,
                rawTweetsBv,
                rawTweets,
                tweets,
                words,
                mapViewHook,
            }}
        >

            <div className={classNames(Style.RepositoryViewer, className)} {...props}>
                {contents}
            </div>

        </ContextRepositoryViewer.Provider>
    )
}
