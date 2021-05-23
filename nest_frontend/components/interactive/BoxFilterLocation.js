import React from "react"
import BoxFull from "../base/BoxFull"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import FormInlineLocation from "./FormInlineLocation"
import { FilterInsideMapArea } from "../../objects/Filter"


/**
 * A {@link BoxFull} that allows the user to add a {@link FilterInsideMapArea} to a RepositoryViewer.
 *
 * It connects to the `mapViewHook` of the RepositoryViewer.
 *
 * @deprecated to be refactored
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFilterLocation({ ...props }) {
    const strings = useStrings()

    const { appendFilter, mapViewHook } = useRepositoryViewer()

    const submit = () => {
        appendFilter(new FilterInsideMapArea(mapViewHook.mapArea))
    }

    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faLocationArrow}/>
                    &nbsp;
                    {strings.byZone}
                </span>
            }
            {...props}
        >
            <FormInlineLocation submit={submit} mapViewHook={mapViewHook}/>
        </BoxFull>
    )
}
