import React from "react"
import BoxFull from "../base/BoxFull"
import FormInline from "../base/FormInline"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FilterWithPlace } from "../../objects/Filter"
import ButtonIconOnly from "../base/ButtonIconOnly"


/**
 * A {@link BoxFull} that allows the user to add a {@link FilterWithPlace} to a RepositoryViewer.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFilterHasPlace({ ...props }) {
    const strings = useStrings()

    const { appendFilter } = useRepositoryViewer()

    const submit = () => {
        appendFilter(new FilterWithPlace())
    }

    // TODO: translate this

    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faMapMarkerAlt}/>
                    &nbsp;
                    {strings.byHasPlace}
                </span>
            }
            {...props}
        >
            <FormInline>
                <div style={{ "flex-grow": 1 }}>
                    {strings.hasPlaceExplaination}
                </div>
                <ButtonIconOnly
                    icon={faPlus}
                    color={"Green"}
                    onClick={submit}
                />
            </FormInline>
        </BoxFull>
    )
}
