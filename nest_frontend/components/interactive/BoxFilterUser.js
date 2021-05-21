import React, { useContext, useState } from "react"
import BoxFull from "../base/BoxFull"
import FormInline from "../base/FormInline"
import InputWithIcon from "../base/InputWithIcon"
import Style from "./BoxConditionUser.module.css"
import { faAt, faFilter, faFont } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { ContainsFilter, UserFilter } from "../../utils/Filter"
import Condition from "../../utils/Condition"
import FormInlineText from "./FormInlineText"


export default function BoxFilterUser({ ...props }) {
    // TODO: Translate this
    // TODO: and also use a better string maybe
    const strings = useStrings()

    const { appendFilter } = useRepositoryViewer()

    const validate = value => {
        return value.replace(/[^a-zA-Z0-9]/g, "")
    }

    const submit = value => {
        appendFilter(new UserFilter(false, value))
    }

    return (
        <BoxFull header={strings.filterUser} {...props}>
            <FormInlineText
                textIcon={faAt}
                placeholder={"jack"}
                validate={validate}
                submit={submit}
            />
        </BoxFull>
    )
}
