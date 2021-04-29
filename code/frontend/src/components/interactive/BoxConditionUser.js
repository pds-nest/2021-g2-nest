import React, { useState } from "react"
import BoxFull from "../base/BoxFull"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faAt, faPlus } from "@fortawesome/free-solid-svg-icons"
import InputWithIcon from "../base/InputWithIcon"
import FormInline from "../base/FormInline"
import Style from "./BoxConditionHashtag.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"


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
    const {conditions, appendCondition} = useRepositoryEditor()

    const onInputChange = event => {
        let text = event.target.value
        text = text.replace(INVALID_USER_CHARACTERS, "")
        return setUser(text)
    }

    const onButtonClick = () => {
        const newCond = {
            "id": null,
            "type": 3,
            "content": user
        }
        let duplicate = null;
        for(const oldCond of conditions) {
            if(newCond.type === oldCond.type && newCond.content === oldCond.content) {
                duplicate = oldCond;
                break;
            }
        }

        if(duplicate) {
            console.debug("Refusing to append ", newCond, " to the Conditions list, as ", duplicate, " already exists.")
        }
        else {
            console.debug("Appending ", newCond, " to the Conditions list")
            appendCondition(newCond)
        }

        setUser("")
    }

    return (
        <BoxFull header={<span>Search by <FontAwesomeIcon icon={faAt}/> user</span>} {...props}>
            <FormInline>
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
