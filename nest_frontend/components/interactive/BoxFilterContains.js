import React from "react"
import BoxFull from "../base/BoxFull"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FilterContains } from "../../utils/Filter"
import FormInlineText from "./FormInlineText"
import { faFont } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function BoxFilterContains({ ...props }) {
    const strings = useStrings()
    const { appendFilter } = useRepositoryViewer()

    const submit = value => {
        appendFilter(new FilterContains(false, value))
    }

    // TODO: add this string
    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faFont}/>
                    &nbsp;
                    {strings.byContents}
                </span>
            }
            {...props}
        >
            <FormInlineText
                submit={submit}
                placeholder={"cat in the box"}
            />
        </BoxFull>
    )
}
