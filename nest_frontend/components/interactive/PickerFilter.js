import React, { useContext } from "react"
import ButtonIconOnly from "../base/ButtonIconOnly"
import { faAt, faClock, faFont, faHashtag, faMapPin, faStar } from "@fortawesome/free-solid-svg-icons"
import ButtonPicker from "./ButtonPicker"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


export default function PickerFilter({ ...props }) {
    const {filterTab, setFilterTab} = useContext(ContextRepositoryViewer)

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
                name={"location"}
                icon={faMapPin}
            />
        </div>
    )
}
