import React, { useCallback, useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin, faPlus } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import Condition from "../../utils/Condition"
import ContextLanguage from "../../contexts/ContextLanguage"
import BoxMap from "../base/BoxMap"


/**
 * https://wiki.openstreetmap.org/wiki/Zoom_levels
 */
const MPIXEL = [
    156412,
    78206,
    39103,
    19551,
    9776,
    4888,
    2444,
    1222,
    610.984,
    305.492,
    152.746,
    76.373,
    38.187,
    19.093,
    9.547,
    4.773,
    2.387,
    1.193,
    0.596,
    0.298,
    0.149,
]


/**
 * A {@link BoxFull} that allows the user to select a geographical location to use to filter tweets.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionMap({ ...props }) {
    const [position, setPosition] = useState()
    const [zoom, setZoom] = useState()
    const [map, setMap] = useState(null)
    const { addCondition } = useRepositoryEditor()
    const { strings } = useContext(ContextLanguage)

    const onMove = useCallback(
        () => {
            setPosition(map.getCenter())
        },
        [map],
    )

    const onZoom = useCallback(
        () => {
            setZoom(map.getZoom())
        },
        [map],
    )

    useEffect(
        () => {
            if(map === null) {
                return
            }

            map.on("move", onMove)
            map.on("zoom", onZoom)
            return () => {
                map.off("move", onMove)
                map.off("zoom", onZoom)
            }
        },
        [map, onMove, onZoom],
    )

    const onButtonClick = () => {
        const mapSize = map.getSize()
        const minSize = Math.min(mapSize.x, mapSize.y)
        const radius = minSize * MPIXEL[zoom]

        addCondition(new Condition(
            "COORDINATES",
            `< ${radius} ${position.lat} ${position.lng}`,
        ))
    }

    return (
        <BoxMap
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faMapPin}/>
                    &nbsp;
                    {strings.byZone}
                </span>
            }
            setMap={setMap}
            button={
                <ButtonIconOnly
                    icon={faPlus}
                    color={"Green"}
                    onClick={onButtonClick}
                />
            }
            {...props}
        />
    )
}
