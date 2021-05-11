import React, { useContext } from "react"
import Style from "./ConditionBadge.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ButtonSmallX from "../base/ButtonSmallX"
import { faAt, faClock, faGlobe, faHashtag, faMapPin } from "@fortawesome/free-solid-svg-icons"
import ContextRepositoryEditor from "../../contexts/ContextRepositoryEditor"


const CONDITION_COLORS = {
    0: "Grey",  // Hashtag
    2: "Yellow",  // Time
    3: "Red",  // Coordinates
    4: "Red",  // Place
    5: "Green",  // User
}


const CONDITION_ICONS = {
    0: faHashtag,  // Hashtag
    2: faClock,  // Time
    3: faGlobe,  // Coordinates
    4: faMapPin,  // Place
    5: faAt,  // User
}


/**
 * A small colored badge representing a Condition for a filter.
 *
 * @param condition - The Condition that this badge represents.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ConditionBadge({ ...condition }) {
    const { id, type, content } = condition
    const color = CONDITION_COLORS[type]
    const icon = CONDITION_ICONS[type]
    const { removeRawCondition } = useContext(ContextRepositoryEditor)

    let displayedContent = content
    if(type === 3) {
        let split = displayedContent.split(" ")
        let radius = Number.parseFloat(split[1]).toFixed(0)
        let radiusType = "m"
        if(radius >= 2000) {
            radius = Math.round(radius / 1000)
            radiusType = "km"
        }
        let lat = Number(split[2]).toFixed(3)
        let lng = Number(split[3]).toFixed(3)
        displayedContent = `${split[0]} ${radius}${radiusType} ${lat} ${lng}`
    }

    return (
        <div
            title={id ? `💠 Condition ID: ${id}` : "✨ New Condition"}
            className={classNames(Style.ConditionBadge, Style[`ConditionBadge${color}`])}
        >
            <div className={Style.Icon}>
                <FontAwesomeIcon icon={icon}/>
            </div>
            <div className={Style.Text}>
                {displayedContent}
            </div>
            <div>
                <ButtonSmallX
                    onClick={() => {
                        console.debug(`Removing Condition: `, condition)
                        removeRawCondition(condition)
                    }}
                />
            </div>
        </div>
    )
}
