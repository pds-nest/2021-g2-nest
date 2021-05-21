import React, { useContext, useState } from "react"
import BoxFull from "../base/BoxFull"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { ContainsFilter } from "../../utils/Filter"
import FormInlineText from "./FormInlineText"
import { faFont } from "@fortawesome/free-solid-svg-icons"


export default function BoxFilterContains({ ...props }) {
    const strings = useStrings()
    const { appendFilter } = useRepositoryViewer()

    const submit = value => {
        appendFilter(new ContainsFilter(false, value))
    }

    // TODO: add this string
    return (
        <BoxFull header={strings.filterContains} {...props}>
            <FormInlineText
                textIcon={faFont}
                submit={submit}
                placeholder={"cat in the box"}
            />
        </BoxFull>
    )
}
