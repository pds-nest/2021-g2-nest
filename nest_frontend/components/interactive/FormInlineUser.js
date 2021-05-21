import React from "react"
import FormInlineText from "./FormInlineText"
import { faAt } from "@fortawesome/free-solid-svg-icons"


// Official hashtag regex from https://stackoverflow.com/a/22490853/4334568
// noinspection RegExpAnonymousGroup,LongLine
const INVALID_CHARACTERS = /[^a-zA-Z0-9]/g


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
