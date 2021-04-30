import React, { useState } from "react"
import BoxFull from "../base/BoxFull"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faAt, faClock, faPlus } from "@fortawesome/free-solid-svg-icons"
import InputWithIcon from "../base/InputWithIcon"
import FormInline from "../base/FormInline"
import Style from "./BoxConditionDatetime.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import ButtonToggleBeforeAfter from "./ButtonToggleBeforeAfter"


const INVALID_USER_CHARACTERS = /[^0-9TZ:-]/g


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
    const {conditions, appendCondition} = useRepositoryEditor()

    const onInputChange = event => {
        let text = event.target.value
        text = text.toUpperCase()
        text = text.replace(INVALID_USER_CHARACTERS, "")
        return setDatetime(text)
    }

    const onButtonClick = () => {


        const newCond = {
            "id": null,
            "type": 2,
            "content": `${ba ? ">" : "<"} ${datetime}`
        }

        const date = new Date(datetime)
        if(date.toString() === "Invalid Date") {
            console.debug("Refusing to append ", newCond, " to the Conditions list, as it is invalid.")
            return
        }

        if(datetime === "") {
            console.debug("Refusing to append ", newCond, " to the Conditions list, as it is empty.")
            return
        }

        let duplicate = null;
        for(const oldCond of conditions) {
            if(newCond.type === oldCond.type && newCond.content === oldCond.content) {
                duplicate = oldCond;
                break;
            }
        }

        if(duplicate) {
            console.debug("Refusing to append ", newCond, " to the Conditions list, as ", duplicate, " already exists.")
        }
        else {
            console.debug("Appending ", newCond, " to the Conditions list")
            appendCondition(newCond)
        }

        setDatetime("")
    }

    return (
        <BoxFull header={<span>Search by <FontAwesomeIcon icon={faClock}/> time period</span>} {...props}>
            <FormInline>
                <ButtonToggleBeforeAfter onUpdate={setBa}/>
                <InputWithIcon
                    className={Style.Input}
                    id={"condition-datetime"}
                    type={"datetime-local"}
                    icon={faClock}
                    value={datetime}
                    onChange={onInputChange}
                    placeholder={"2021-12-31T23:59"}
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
