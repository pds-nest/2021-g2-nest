import React, { useState } from "react"
import FormInline from "../base/FormInline"
import InputWithIcon from "../base/InputWithIcon"
import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import Style from "./FormInlineText.module.css"
import ButtonToggleBeforeAfter from "./ButtonToggleBeforeAfter"


const INVALID_CHARACTERS = /[^0-9TZ:+-]/g


export default function FormInlineBADatetime(
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
        submit({
            date: new Date(value),
            isBefore,
        })
        setValue("")
    }

    const _onChange = event => {
        setValue(validate(event.target.value.replace(INVALID_CHARACTERS, "")))
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
            />
        </FormInline>
    )
}
