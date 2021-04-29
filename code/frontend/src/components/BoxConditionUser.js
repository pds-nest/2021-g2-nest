import React, { useContext, useState } from "react"
import BoxFull from "./BoxFull"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faAt, faHashtag, faPlus } from "@fortawesome/free-solid-svg-icons"
import InputWithIcon from "./InputWithIcon"
import FormInline from "./FormInline"
import Style from "./BoxConditionHashtag.module.css"
import ButtonIconOnly from "./ButtonIconOnly"
import ContextRepositoryEditor from "../contexts/ContextRepositoryEditor"


const INVALID_USER_CHARACTERS = /[^a-zA-Z0-9]/g


export default function BoxConditionUser({ ...props }) {
    const [user, setUser] = useState("")
    const {conditions, appendCondition} = useContext(ContextRepositoryEditor)

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
