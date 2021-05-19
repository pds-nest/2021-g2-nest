import React from "react"
import ButtonIconOnly from "../base/ButtonIconOnly"
import { faAt, faChartBar, faClock, faCloud, faHashtag, faMap, faMapPin } from "@fortawesome/free-solid-svg-icons"


export default function PickerFilter({ currentTab, setTab, ...props }) {
    return (
        <div {...props}>
            <ButtonIconOnly onClick={() => setTab("hashtag")} disabled={currentTab === "hashtag"} color={"Grey"} icon={faHashtag}/>
            <ButtonIconOnly onClick={() => setTab("user")} disabled={currentTab === "user"} color={"Grey"} icon={faAt}/>
            <ButtonIconOnly onClick={() => setTab("location")} disabled={currentTab === "location"} color={"Grey"} icon={faMapPin}/>
            <ButtonIconOnly onClick={() => setTab("time")} disabled={currentTab === "time"} color={"Grey"} icon={faClock}/>
        </div>
    )
}
