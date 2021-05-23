import React from "react"
import BoxFull from "../base/BoxFull"
import { faClock, faHashtag } from "@fortawesome/free-solid-svg-icons"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FilterHashtag } from "../../objects/Filter"
import FormInlineHashtag from "./FormInlineHashtag"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


/**
 * A {@link BoxFull} that allows the user to select a Twitter hashtag to search for, and then to add it as a
 * {@link FilterContains} of a RepositoryViewer.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFilterHashtag({ ...props }) {
    const strings = useStrings()
    const { appendFilter } = useRepositoryViewer()

    const submit = value => {
        appendFilter(new FilterHashtag(value))
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
