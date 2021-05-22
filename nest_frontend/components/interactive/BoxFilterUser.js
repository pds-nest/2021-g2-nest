import React from "react"
import BoxFull from "../base/BoxFull"
import { faAt } from "@fortawesome/free-solid-svg-icons"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FilterPoster } from "../../utils/Filter"
import FormInlineUser from "./FormInlineUser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function BoxFilterUser({ ...props }) {
    // TODO: Translate this
    // TODO: and also use a better string maybe
    const strings = useStrings()

    const { appendFilter } = useRepositoryViewer()

    const submit = value => {
        appendFilter(new FilterPoster(false, value))
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
