import React, { useState } from "react"
import BoxFull from "../base/BoxFull"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAt, faPlus } from "@fortawesome/free-solid-svg-icons"
import InputWithIcon from "../base/InputWithIcon"
import FormInline from "../base/FormInline"
import Style from "./BoxConditionUser.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import Condition from "../../utils/Condition"
import Localization from "../../Localization"


const INVALID_USER_CHARACTERS = /[^a-zA-Z0-9]/g


/**
 * A {@link BoxFull} that allows the user to select a Twitter user to search for, and then to add it as a Condition
 * to the {@link ContextRepositoryEditor}.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionUser({ ...props }) {
    const [user, setUser] = useState("")
    const { addCondition } = useRepositoryEditor()

    const onInputChange = event => {
        let text = event.target.value
        text = text.replace(INVALID_USER_CHARACTERS, "")
        return setUser(text)
    }

    const onButtonClick = e => {
        addCondition(new Condition("USER", user))
        setUser("")

        // Prevent reloading the page!
        e.preventDefault()
    }

    return (
        <BoxFull header={<span>{Localization.searchBy}<FontAwesomeIcon icon={faAt}/> {Localization.byUser}</span>} {...props}>
            <FormInline onSubmit={onButtonClick}>
                <InputWithIcon
                    className={Style.Input}
                    id={"condition-hashtag"}
                    icon={faAt}
                    value={user}
                    onChange={onInputChange}
                    placeholder={"jack"}
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
