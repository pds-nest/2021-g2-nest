import React, { useContext } from "react"
import Style from "./ConditionBadge.module.css"
import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
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
    const {removeRawCondition} = useContext(ContextRepositoryEditor)

    return (
        <div
            title={id ? `💠 Condition ID: ${id}` : "✨ New Condition"}
            className={classNames(Style.ConditionBadge, Style[`ConditionBadge${color}`])}
        >
            <div className={Style.Icon}>
                <FontAwesomeIcon icon={icon}/>
            </div>
            <div className={Style.Text}>
                {content}
            </div>
            <div>
                <ButtonSmallX onClick={() => {
                    console.debug(`Removing Condition: `, condition)
                    removeRawCondition(condition)
                }}/>
            </div>
        </div>
    )
}
