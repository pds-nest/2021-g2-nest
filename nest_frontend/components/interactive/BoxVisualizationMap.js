import React, { useContext, useMemo } from "react"
import BoxMap from "../base/BoxMap"
import ContextLanguage from "../../contexts/ContextLanguage"
import { Marker, Popup } from "react-leaflet"
import { Location } from "../../objects/location"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


/**
 * A {@link BoxMap} displaying the displayed tweets of a RepositoryViewer as {@link Marker}s.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxVisualizationMap({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const { tweets, mapViewHook } = useContext(ContextRepositoryViewer)

    const markers = useMemo(
        () => {
            return tweets.filter(tweet => tweet.location).map(tweet => {
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
        },
        [tweets],
    )

    return (
        <BoxMap header={strings.visualMap} mapViewHook={mapViewHook} {...props}>
            {markers}
        </BoxMap>
    )
}
