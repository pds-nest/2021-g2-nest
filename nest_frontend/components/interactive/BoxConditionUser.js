import React, { useCallback } from "react"
import BoxFull from "../base/BoxFull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAt } from "@fortawesome/free-solid-svg-icons"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import FormInlineUser from "./FormInlineUser"
import { ConditionUser } from "../../objects/Condition"
import useStrings from "../../hooks/useStrings"


/**
 * A {@link BoxFull} that allows the user to select a Twitter user to search for, and then to add it as a
 * {@link ConditionUser} of a RepositoryEditor.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionUser({ ...props }) {
    const { addCondition } = useRepositoryEditor()
    const strings = useStrings()

    const submit = useCallback(
        value => addCondition(new ConditionUser(value)),
        [addCondition],
    )

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
