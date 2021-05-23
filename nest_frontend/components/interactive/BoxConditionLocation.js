import React, { useCallback, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow, faPlus } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import ContextLanguage from "../../contexts/ContextLanguage"
import BoxMap from "../base/BoxMap"
import useMapAreaState from "../../hooks/useMapAreaState"
import { ConditionLocation } from "../../objects/Condition"


/**
 * A {@link BoxMap} that allows the user to select a geographical location, and then to add it as a
 * {@link ConditionLocation} of a RepositoryEditor.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionLocation({ ...props }) {
    const mapViewHook = useMapAreaState()
    const { addCondition } = useRepositoryEditor()
    const { strings } = useContext(ContextLanguage)

    const onButtonClick = useCallback(
        () => addCondition(new ConditionLocation(mapViewHook.mapArea)),
        [mapViewHook, addCondition],
    )

    return (
        <BoxMap
            mapViewHook={mapViewHook}
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faLocationArrow}/>
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
