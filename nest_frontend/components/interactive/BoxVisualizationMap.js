import React, { useContext } from "react"
import BoxMap from "../base/BoxMap"
import ContextLanguage from "../../contexts/ContextLanguage"
import { Marker, Popup } from "react-leaflet"


const locationRegex = /[{](?<lat>[0-9.]+),(?<lng>[0-9.]+)[}]/

export default function BoxVisualizationMap({ tweets, ...props }) {
    // TODO: translate this
    const {strings} = useContext(ContextLanguage)

    console.debug(tweets)
    const markers = tweets.filter(tweet => tweet.location).map(tweet => {
        const match = locationRegex.exec(tweet.location)
        if(!match) {
            console.error("No match for location ", tweet.location)
            return null
        }
        const {lat, lng} = match.groups
        return (
            <Marker key={tweet["snowflake"]} position={[Number.parseFloat(lat), Number.parseFloat(lng)]}>
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
        <BoxMap header={"Map"} {...props}>
            {markers}
        </BoxMap>
    )
}
