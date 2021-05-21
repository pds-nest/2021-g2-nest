import React, { useState } from "react"
import FormInline from "../base/FormInline"
import InputWithIcon from "../base/InputWithIcon"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import Style from "./FormInlineText.module.css"


export default function FormInlineText({ textIcon, placeholder, buttonIcon = faPlus, buttonColor = "Green", validate = value => value, submit, ...props }) {
    const [value, setValue] = useState("")

    const _onSubmit = event => {
        event.preventDefault()
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
            />
        </FormInline>
    )
}
