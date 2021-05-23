import React, { useState } from "react"
import FormInline from "../base/FormInline"
import InputWithIcon from "../base/InputWithIcon"
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import Style from "./FormInlineText.module.css"
import ButtonToggleBeforeAfter from "./ButtonToggleBeforeAfter"
import TimeRay from "../../objects/TimeRay"


const INVALID_CHARACTERS = /[^0-9TZ:+.-]/g


/**
 * A {@link FormInline} allowing the user to select a {@link TimeRay}.
 *
 * @param textIcon - The icon to display in the text field.
 * @param buttonIcon - The icon to display on the submit button.
 * @param buttonColor - The color of the submit button.
 * @param placeholder - The placeholder of the text field.
 * @param validate - Function <string -> string> called to set the value of the text field.
 * @param submit - Function <{@link TimeRay}> called when the submit button is pressed.
 * @param props - Additional props to pass to the form.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormInlineTimeRay(
    {
        textIcon = faClock,
        buttonIcon = faPlus,
        buttonColor = "Green",
        placeholder = new Date().toISOString(),
        validate = value => value,
        submit,
        ...props
    },
) {
    const [isBefore, setBefore] = useState(false)
    const [value, setValue] = useState("")

    const _onSubmit = event => {
        event.preventDefault()
        if(!value) return
        console.debug(value)
        submit(new TimeRay(isBefore, new Date(value)))
        setValue("")
    }

    const _onChange = event => {
        setValue(validate(event.target.value.toUpperCase().replace(INVALID_CHARACTERS, "")))
    }

    return (
        <FormInline onSubmit={_onSubmit} {...props}>
            <ButtonToggleBeforeAfter
                isBefore={isBefore}
                setBefore={setBefore}
            />
            <InputWithIcon
                className={Style.Input}
                type={"datetime-local"}
                icon={textIcon}
                value={value}
                onChange={_onChange}
                placeholder={placeholder}
            />
            <ButtonIconOnly
                className={Style.Button}
                icon={buttonIcon}
                color={buttonColor}
                onClick={_onSubmit}
                disabled={!value}
            />
        </FormInline>
    )
}
