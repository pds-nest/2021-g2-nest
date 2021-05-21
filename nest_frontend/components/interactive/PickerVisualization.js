import React, { useContext } from "react"
import { faChartBar, faCloud, faMap, faStar } from "@fortawesome/free-solid-svg-icons"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"
import ButtonPicker from "./ButtonPicker"


export default function PickerVisualization({ ...props }) {
    const { visualizationTab, setVisualizationTab } = useContext(ContextRepositoryViewer)

    return (
        <div {...props}>
            <ButtonPicker
                currentTab={visualizationTab}
                setTab={setVisualizationTab}
                name={"stats"}
                icon={faStar}
            />
            <ButtonPicker
                currentTab={visualizationTab}
                setTab={setVisualizationTab}
                name={"wordcloud"}
                icon={faCloud}
            />
            <ButtonPicker
                currentTab={visualizationTab}
                setTab={setVisualizationTab}
                name={"chart"}
                icon={faChartBar}
            />
            <ButtonPicker
                currentTab={visualizationTab}
                setTab={setVisualizationTab}
                name={"map"}
                icon={faMap}
            />
        </div>
    )
}
