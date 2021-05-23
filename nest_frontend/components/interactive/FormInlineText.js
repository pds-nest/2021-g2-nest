import React, { useState } from "react"
import FormInline from "../base/FormInline"
import InputWithIcon from "../base/InputWithIcon"
import { faFont, faPlus } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import Style from "./FormInlineText.module.css"


/**
 * A {@link FormInline} allowing the user to enter a string.
 *
 * @param textIcon - The icon to display in the text field.
 * @param buttonIcon - The icon to display on the submit button.
 * @param buttonColor - The color of the submit button.
 * @param placeholder - The placeholder of the text field.
 * @param validate - Function <string -> string> called to set the value of the text field.
 * @param submit - Function <string> called when the submit button is pressed.
 * @param props - Additional props to pass to the form.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormInlineText(
    {
        textIcon = faFont,
        buttonIcon = faPlus,
        buttonColor = "Green",
        placeholder = "",
        validate = val => val,
        submit,
        ...props
    },
) {
    const [value, setValue] = useState("")

    const _onSubmit = event => {
        event.preventDefault()
        if(!value) {
            return
        }
        submit(value)
        setValue("")
    }

    const _onChange = event => {
        setValue(validate(event.target.value))
    }

    return (
        <FormInline onSubmit={_onSubmit} {...props}>
            <InputWithIcon
                className={Style.Input}
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
