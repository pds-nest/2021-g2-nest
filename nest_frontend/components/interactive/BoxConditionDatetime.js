import React, { useContext, useState } from "react"
import BoxFull from "../base/BoxFull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons"
import InputWithIcon from "../base/InputWithIcon"
import FormInline from "../base/FormInline"
import Style from "./BoxConditionDatetime.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import ButtonToggleBeforeAfter from "./ButtonToggleBeforeAfter"
import Condition from "../../utils/Condition"
import convertToLocalISODate from "../../utils/convertToLocalISODate"
import ContextLanguage from "../../contexts/ContextLanguage"


const INVALID_USER_CHARACTERS = /[^0-9TZ:+-]/g


/**
 * A {@link BoxFull} that allows the user to select a Twitter user to search for, and then to add it as a Condition
 * to the {@link ContextRepositoryEditor}.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionDatetime({ ...props }) {
    const [datetime, setDatetime] = useState("")
    const [ba, setBa] = useState(false)
    const { addCondition } = useRepositoryEditor()
    const {strings} = useContext(ContextLanguage)

    const onInputChange = event => {
        let text = event.target.value
        text = text.toUpperCase()
        text = text.replace(INVALID_USER_CHARACTERS, "")
        return setDatetime(text)
    }

    const onButtonClick = e => {
        const naive = new Date(datetime)
        if(naive.toString() === "Invalid Date") {
            console.debug("Refusing to add condition: ", naive, " is an Invalid Date.")
            return
        }
        const aware = convertToLocalISODate(naive)
        addCondition(new Condition("TIME", `${ba ? ">" : "<"} ${aware}`))
        setDatetime("")

        // Prevent reloading the page!
        e.preventDefault()
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
            <FormInline onSubmit={onButtonClick}>
                <ButtonToggleBeforeAfter onUpdate={setBa}/>
                <InputWithIcon
                    className={Style.Input}
                    id={"condition-datetime"}
                    type={"datetime-local"}
                    icon={faClock}
                    value={datetime}
                    onChange={onInputChange}
                    placeholder={"2021-12-31T23:59Z"}
                />
                <ButtonIconOnly
                    className={Style.Button}
                    icon={faPlus}
                    color={"Green"}
                    onClick={onButtonClick}
                />
            </FormInline>
        </BoxFull>
    )
}
