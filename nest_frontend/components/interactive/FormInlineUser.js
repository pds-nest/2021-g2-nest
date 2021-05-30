import React from "react"
import FormInlineText from "./FormInlineText"
import { faAt } from "@fortawesome/free-solid-svg-icons"


const INVALID_CHARACTERS = /[^a-zA-Z0-9_]/g


/**
 * A {@link FormInline} allowing the user to select a Twitter user.
 *
 * @param props - Additional props to pass to the form.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormInlineUser({ ...props }) {

    const validate = value => {
        return value.replace(INVALID_CHARACTERS, "")
    }

    return (
        <FormInlineText
            textIcon={faAt}
            placeholder={"jack"}
            validate={validate}
            {...props}
        />
    )
}
