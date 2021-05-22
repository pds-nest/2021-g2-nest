import React, { useCallback, useContext } from "react"
import BoxFull from "../base/BoxFull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import ContextLanguage from "../../contexts/ContextLanguage"
import FormInlineBADatetime from "./FormInlineBADatetime"
import { ConditionTime } from "../../objects/Condition"


/**
 * A {@link BoxFull} that allows the user to select a Twitter user to search for, and then to add it as a
 * {@link ConditionTime} of a RepositoryEditor.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionDatetime({ ...props }) {
    const { addCondition } = useRepositoryEditor()
    const { strings } = useContext(ContextLanguage)

    const submit = useCallback(
        timeRay => addCondition(new ConditionTime(timeRay)),
        [addCondition]
    )

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
            <FormInlineBADatetime
                submit={submit}
            />
        </BoxFull>
    )
}
