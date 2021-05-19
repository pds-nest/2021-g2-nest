import React from "react"
import ButtonIconOnly from "../base/ButtonIconOnly"
import {
    faAt,
    faChartBar,
    faClock,
    faCloud,
    faHashtag,
    faMap,
    faMapPin,
    faStar,
} from "@fortawesome/free-solid-svg-icons"


export default function PickerVisualization({ currentTab, setTab, ...props }) {
    return (
        <div {...props}>
            <ButtonIconOnly onClick={() => setTab("wordcloud")} disabled={currentTab === "wordcloud"} color={"Grey"} icon={faCloud}/>
            <ButtonIconOnly onClick={() => setTab("histogram")} disabled={currentTab === "histogram"} color={"Grey"} icon={faChartBar}/>
            <ButtonIconOnly onClick={() => setTab("map")} disabled={currentTab === "map"} color={"Grey"} icon={faMap}/>
            <ButtonIconOnly onClick={() => setTab("stats")} disabled={currentTab === "stats"} color={"Grey"} icon={faStar}/>
        </div>
    )
}
