import React, { useCallback } from "react"
import BoxFull from "../base/BoxFull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import FormInlineHashtag from "./FormInlineHashtag"
import { ConditionHashtag } from "../../objects/Condition"
import useStrings from "../../hooks/useStrings"


/**
 * A {@link BoxFull} that allows the user to select a Twitter hashtag to search for, and then to add it as a
 * {@link ConditionHashtag} of a RepositoryEditor.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionHashtag({ ...props }) {
    const { addCondition } = useRepositoryEditor()
    const strings = useStrings()

    const submit = useCallback(
        value => addCondition(new ConditionHashtag(value)),
        [addCondition],
    )

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
            <FormInlineHashtag
                submit={submit}
            />
        </BoxFull>
    )
}
