import React, { useContext } from "react"
import BoxMap from "../base/BoxMap"
import ContextLanguage from "../../contexts/ContextLanguage"
import { Marker, Popup } from "react-leaflet"
import { Location } from "../../utils/location"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


export default function BoxVisualizationMap({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const {tweets} = useContext(ContextRepositoryViewer)

    console.debug(tweets)
    const markers = tweets.filter(tweet => tweet.location).map(tweet => {
        const location = Location.fromTweet(tweet)

        return (
            <Marker key={tweet["snowflake"]} position={location.toArray()}>
                <Popup>
                    <p>
                        {tweet["content"]}
                    </p>
                    <p>
                        — <a href={`https://twitter.com/${tweet["poster"]}/status/${tweet["snowflake"]}`}>@{tweet["poster"]}</a>
                    </p>
                </Popup>
            </Marker>
        )
    })

    return (
        <BoxMap header={strings.visualMap} {...props}>
            {markers}
        </BoxMap>
    )
}
