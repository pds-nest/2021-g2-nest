import React, { useState } from "react"
import BoxFull from "../base/BoxFull"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMapPin, faPlus } from "@fortawesome/free-solid-svg-icons"
import FormInline from "../base/FormInline"
import Style from "./BoxConditionMap.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import {MapContainer, TileLayer} from "react-leaflet"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"


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
        <BoxFull header={<span>Search by <FontAwesomeIcon icon={faMapPin}/> zone</span>} {...props}>
            <MapContainer center={[41.89309, 12.48289]} zoom={3} style={{"height": "400px"}}>
                <TileLayer
                    attribution='(c) <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <FormInline>
                <ButtonIconOnly
                    className={Style.Button}
                    icon={faPlus}
                    color={"Green"}
                    onClick={onButtonClick}
                />
            </FormInline>
        </BoxFull>
    )
}
