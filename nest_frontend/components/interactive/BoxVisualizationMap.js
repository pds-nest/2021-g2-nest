import React, { useContext, useMemo } from "react"
import BoxMap from "../base/BoxMap"
import ContextLanguage from "../../contexts/ContextLanguage"
import { Marker, Popup } from "react-leaflet"
import Coordinates from "../../objects/Coordinates"
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
                if(!tweet.location) return null

                const coords = Coordinates.fromCrawlerString(tweet.location)

                return (
                    <Marker key={tweet["snowflake"]} position={coords.toLatLng()}>
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
