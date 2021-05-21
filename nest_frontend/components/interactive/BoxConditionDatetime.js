import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import Condition from "../../utils/Condition"
import convertToLocalISODate from "../../utils/convertToLocalISODate"
import ContextLanguage from "../../contexts/ContextLanguage"
import FormInlineBADatetime from "./FormInlineBADatetime"


/**
 * A {@link BoxFull} that allows the user to select a Twitter user to search for, and then to add it as a Condition
 * to the {@link ContextRepositoryEditor}.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionDatetime({ ...props }) {
    const { addCondition } = useRepositoryEditor()
    const { strings } = useContext(ContextLanguage)

    const submit = ({ date, isBefore }) => {
        if(date.toString() === "Invalid Date") {
            console.debug("Refusing to add condition: ", date, " is an Invalid Date.")
            return
        }
        const aware = convertToLocalISODate(date)
        addCondition(new Condition("TIME", `${isBefore ? "<" : ">"} ${aware}`))
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
            <FormInlineBADatetime
                submit={submit}
            />
        </BoxFull>
    )
}
