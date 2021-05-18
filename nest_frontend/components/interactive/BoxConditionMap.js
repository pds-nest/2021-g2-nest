import React, { useCallback, useContext, useEffect, useState } from "react"
import BoxFull from "../base/BoxFull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAt, faMapPin, faPlus } from "@fortawesome/free-solid-svg-icons"
import Style from "./BoxConditionMap.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import { MapContainer, TileLayer } from "react-leaflet"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import Condition from "../../utils/Condition"
import ContextLanguage from "../../contexts/ContextLanguage"


const STARTING_POSITION = { lat: 41.89309, lng: 12.48289 }
const STARTING_ZOOM = 3

// FIXME: this only works correctly at the equator!
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
    const [position, setPosition] = useState(STARTING_POSITION)
    const [zoom, setZoom] = useState(STARTING_ZOOM)
    const [map, setMap] = useState(null)
    const { addCondition } = useRepositoryEditor()
    const {strings} = useContext(ContextLanguage)

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
        setPosition(STARTING_POSITION)
    }

    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faMapPin}/>
                    &nbsp;
                    {strings.byZone}
                </span>
            }
            childrenClassName={Style.BoxConditionMapContents}
            {...props}
        >
            <MapContainer
                center={STARTING_POSITION}
                zoom={STARTING_ZOOM}
                className={Style.MapContainer}
                whenCreated={setMap}
            >
                <TileLayer
                    attribution='(c) <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <div className={"leaflet-top leaflet-right"}>
                    <div className={"leaflet-control"}>
                        <ButtonIconOnly
                            className={Style.Button}
                            icon={faPlus}
                            color={"Green"}
                            onClick={onButtonClick}
                        />
                    </div>
                </div>
            </MapContainer>
        </BoxFull>
    )
}
