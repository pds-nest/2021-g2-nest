import React, { useCallback, useState, useRef, useMemo } from "react"
import BoxFull from "../base/BoxFull"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMapPin, faPlus } from "@fortawesome/free-solid-svg-icons"
import FormInline from "../base/FormInline"
import Style from "./BoxConditionMap.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import Condition from "../../utils/Condition"


const STARTING_POSITION = [41.89309, 12.48289]
const STARTING_ZOOM = 3


/**
 * A {@link BoxFull} that allows the user to select a geographical location to use to filter tweets.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionMap({ ...props }) {
    const [position, setPosition] = useState({lat: STARTING_POSITION[0], lng: STARTING_POSITION[1]})
    const {addCondition} = useRepositoryEditor()

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const pos = marker.getLatLng()
                    console.debug("Changing marker position to: ", pos)
                    setPosition(pos)
                }
            },
        }),
        [],
    )

    const onButtonClick = () => {
        addCondition(new Condition(
            "COORDINATES",
            `WIP WIP ${position.lat.toFixed(6)} ${position.lng.toFixed(6)}`
        ))
        setPosition({lat: STARTING_POSITION[0], lng: STARTING_POSITION[1]})
    }

    return (
        <BoxFull
            header={<span>Search by <FontAwesomeIcon icon={faMapPin}/> zone</span>}
            childrenClassName={Style.BoxConditionMapContents}
            {...props}
        >
            <MapContainer
                center={STARTING_POSITION}
                zoom={STARTING_ZOOM}
                className={Style.MapContainer}
            >
                <TileLayer
                    attribution='(c) <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker ref={markerRef} draggable={true} position={position} eventHandlers={eventHandlers}/>
            </MapContainer>
            <ButtonIconOnly
                className={Style.Button}
                icon={faPlus}
                color={"Green"}
                onClick={onButtonClick}
            />
        </BoxFull>
    )
}
