import React from "react"
import BoxFull from "../base/BoxFull"
import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { HashtagFilter } from "../../utils/Filter"
import FormInlineHashtag from "./FormInlineHashtag"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function BoxFilterHashtag({ ...props }) {
    const strings = useStrings()
    const { appendFilter } = useRepositoryViewer()

    const submit = value => {
        appendFilter(new HashtagFilter(false, value))
    }

    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faHashtag}/>
                    &nbsp;
                    {strings.byHashtag}
                </span>
            }
            {...props}
        >
            <FormInlineHashtag submit={submit}/>
        </BoxFull>
    )
}
