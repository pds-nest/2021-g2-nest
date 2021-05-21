import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAt } from "@fortawesome/free-solid-svg-icons"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import Condition from "../../utils/Condition"
import ContextLanguage from "../../contexts/ContextLanguage"
import FormInlineUser from "./FormInlineUser"


/**
 * A {@link BoxFull} that allows the user to select a Twitter user to search for, and then to add it as a Condition
 * to the {@link ContextRepositoryEditor}.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionUser({ ...props }) {
    const { addCondition } = useRepositoryEditor()
    const { strings } = useContext(ContextLanguage)

    const submit = value => {
        addCondition(new Condition("USER", value))
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
