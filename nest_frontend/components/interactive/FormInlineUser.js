import React from "react"
import FormInlineText from "./FormInlineText"
import { faAt } from "@fortawesome/free-solid-svg-icons"


const INVALID_CHARACTERS = /[^a-zA-Z0-9]/g


/**
 * A {@link FormInline} allowing the user to select a Twitter user.
 *
 * @param submit - Function <string> called when the submit button is pressed.
 * @param props - Additional props to pass to the form.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormInlineUser({ submit, ...props }) {

    const validate = value => {
        return value.replace(INVALID_CHARACTERS, "")
    }

    return (
        <FormInlineText
            textIcon={faAt}
            placeholder={"jack"}
            validate={validate}
            submit={submit}
            {...props}
        />
    )
}
