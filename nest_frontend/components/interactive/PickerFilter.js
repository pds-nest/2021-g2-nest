import React, { useContext } from "react"
import ButtonIconOnly from "../base/ButtonIconOnly"
import { faAt, faClock, faFont, faHashtag, faLocationArrow, faMapPin } from "@fortawesome/free-solid-svg-icons"
import ButtonPicker from "./ButtonPicker"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


export default function PickerFilter({ ...props }) {
    const { filterTab, setFilterTab, setVisualizationTab } = useContext(ContextRepositoryViewer)

    return (
        <div {...props}>
            <ButtonPicker
                currentTab={filterTab}
                setTab={setFilterTab}
                name={"contains"}
                icon={faFont}
            />
            <ButtonPicker
                currentTab={filterTab}
                setTab={setFilterTab}
                name={"hashtag"}
                icon={faHashtag}
            />
            <ButtonPicker
                currentTab={filterTab}
                setTab={setFilterTab}
                name={"user"}
                icon={faAt}
            />
            <ButtonPicker
                currentTab={filterTab}
                setTab={setFilterTab}
                name={"time"}
                icon={faClock}
            />
            <ButtonPicker
                currentTab={filterTab}
                setTab={setFilterTab}
                name={"place"}
                icon={faLocationArrow}
            />
            <ButtonIconOnly
                onClick={() => {
                    setVisualizationTab("map")
                    setFilterTab("location")
                }}
                disabled={filterTab === "location"}
                color={"Grey"}
                icon={faMapPin}
            />
        </div>
    )
}
