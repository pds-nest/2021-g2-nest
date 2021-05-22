import React, { useCallback, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin, faPlus } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import Condition from "../../utils/Condition"
import ContextLanguage from "../../contexts/ContextLanguage"
import BoxMap from "../base/BoxMap"
import useMapAreaState from "../../hooks/useMapAreaState"
import osmZoomLevels from "../../utils/osmZoomLevels"


/**
 * A {@link BoxFull} that allows the user to select a geographical location to use to filter tweets.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionMap({ ...props }) {
    const mapViewHook = useMapAreaState()
    const { addCondition } = useRepositoryEditor()
    const { strings } = useContext(ContextLanguage)

    const onButtonClick = useCallback(
        () => {
            const radius = mapViewHook.zoom * osmZoomLevels[mapViewHook.zoom]

            addCondition(new Condition(
                "COORDINATES",
                `< ${radius} ${mapViewHook.center.lat} ${mapViewHook.center.lng}`,
            ))
        },
        [mapViewHook, addCondition]
    )

    return (
        <BoxMap
            mapViewHook={mapViewHook}
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faMapPin}/>
                    &nbsp;
                    {strings.byZone}
                </span>
            }
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
