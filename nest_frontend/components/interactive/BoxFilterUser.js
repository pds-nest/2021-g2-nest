import React from "react"
import BoxFull from "../base/BoxFull"
import { faAt } from "@fortawesome/free-solid-svg-icons"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FilterPoster } from "../../objects/Filter"
import FormInlineUser from "./FormInlineUser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


/**
 * A {@link BoxFull} that allows the user to select a Twitter user to search for, and then to add it as a
 * {@link FilterPoster} of a RepositoryViewer.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFilterUser({ ...props }) {
    const strings = useStrings()

    const { appendFilter } = useRepositoryViewer()

    const submit = value => {
        appendFilter(new FilterPoster(value))
    }

    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faAt}/>
                    &nbsp;
                    {strings.byUser}
                </span>
            }
            {...props}
        >
            <FormInlineUser
                submit={submit}
            />
        </BoxFull>
    )
}
