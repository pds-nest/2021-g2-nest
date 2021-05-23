import React, { useContext } from "react"
import { faChartBar, faCloud, faMap, faStar } from "@fortawesome/free-solid-svg-icons"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"
import ButtonPicker from "./ButtonPicker"


/**
 * Tab selector for the Visualization box of a RepositoryViewer.
 *
 * @param props - Additional props to pass to the div.
 * @returns {JSX.Element}
 * @constructor
 */
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
