import React from "react"
import BoxFull from "../base/BoxFull"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FilterInsideTimeRay } from "../../objects/Filter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormInlineTimeRay from "./FormInlineTimeRay"


/**
 * A {@link BoxFull} that allows the user to select a {@link TimeRay}, and then to add it as a
 * {@link FilterInsideTimeRay} of a RepositoryViewer.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFilterDatetime({ ...props }) {
    const strings = useStrings()
    const { appendFilter } = useRepositoryViewer()

    const submit = (timeRay) => {
        appendFilter(new FilterInsideTimeRay(timeRay))
    }

    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faClock}/>
                    &nbsp;
                    {strings.byTimePeriod}
                </span>
            }
            {...props}
        >
            <FormInlineTimeRay submit={submit}/>
        </BoxFull>
    )
}
