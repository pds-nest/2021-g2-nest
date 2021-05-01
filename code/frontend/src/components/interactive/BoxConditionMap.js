import React, { useState } from "react"
import BoxFull from "../base/BoxFull"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMapPin, faPlus } from "@fortawesome/free-solid-svg-icons"
import FormInline from "../base/FormInline"
import Style from "./BoxConditionMap.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"


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
    const [user, setUser] = useState("")
    const {conditions, appendCondition} = useRepositoryEditor()

    const onButtonClick = () => {
        const newCond = {
            "id": null,
            "type": 1,
            "content": null
        }

        if(user === "") {
            console.debug("Refusing to append ", newCond, " to the Conditions list, as it is empty.")
            return
        }

        let duplicate = null;
        for(const oldCond of conditions) {
            if(newCond.type === oldCond.type && newCond.content === oldCond.content) {
                duplicate = oldCond;
                break;
            }
        }

        if(duplicate) {
            console.debug("Refusing to append ", newCond, " to the Conditions list, as ", duplicate, " already exists.")
        }
        else {
            console.debug("Appending ", newCond, " to the Conditions list")
            appendCondition(newCond)
        }

        setUser("")
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
                <Marker draggable={true} position={STARTING_POSITION}/>
            </MapContainer>
        </BoxFull>
    )
}
