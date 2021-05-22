import React from "react"
import BoxFull from "../base/BoxFull"
import { faClock, faHashtag } from "@fortawesome/free-solid-svg-icons"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FilterInsideTimeRay } from "../../utils/Filter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormInlineBADatetime from "./FormInlineBADatetime"


export default function BoxFilterDatetime({ ...props }) {
    const strings = useStrings()
    const { appendFilter } = useRepositoryViewer()

    const submit = ({ date, isBefore }) => {
        appendFilter(new FilterInsideTimeRay(isBefore, date))
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
            <FormInlineBADatetime submit={submit}/>
        </BoxFull>
    )
}
