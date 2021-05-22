import React from "react"
import BoxFull from "../base/BoxFull"
import FormInline from "../base/FormInline"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapPin } from "@fortawesome/free-solid-svg-icons"
import FormInlineLocation from "./FormInlineLocation"
import { FilterInsideMapArea } from "../../utils/Filter"


export default function BoxFilterLocation({ ...props }) {
    const strings = useStrings()

    const { appendFilter, mapViewHook } = useRepositoryViewer()

    const submit = () => {
        appendFilter(new FilterInsideMapArea(false, mapViewHook.center, mapViewHook.radius))
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
            {...props}
        >
            <FormInlineLocation submit={submit} mapViewHook={mapViewHook}/>
        </BoxFull>
    )
}
