import React, { useCallback, useContext, useState } from "react"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import InputWithIcon from "../base/InputWithIcon"
import { faEnvelope, faKey, faPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import FormButton from "../base/formparts/FormButton"
import BoxFull from "../base/BoxFull"
import FormAlert from "../base/formparts/FormAlert"
import ContextLanguage from "../../contexts/ContextLanguage"


export default function BoxUserCreate({ createUser, running, ...props }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(undefined)
    const { strings } = useContext(ContextLanguage)

    const onButtonClick = useCallback(
        async () => {
            const result = await createUser({
                "email": email,
                "username": username,
                "password": password,
            })
            setError(result.error)
        },
        [createUser, email, username, password],
    )

    return (
        <BoxFull header={strings.userCreate} {...props}>
            <FormLabelled>
                <FormLabel text={strings.userName}>
                    <InputWithIcon
                        icon={faUser}
                        type={"text"}
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </FormLabel>
                <FormLabel text={strings.email}>
                    <InputWithIcon
                        icon={faEnvelope}
                        type={"text"}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </FormLabel>
                <FormLabel text={strings.passwd}>
                    <InputWithIcon
                        icon={faKey}
                        type={"password"}
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </FormLabel>
                {error ?
                 <FormAlert color={"Red"}>
                     {error.toString()}
                 </FormAlert>
                       : null}
                <FormButton
                    color={"Green"}
                    icon={faPlus}
                    onClick={onButtonClick}
                    disabled={running}
                >
                    {strings.create}
                </FormButton>
            </FormLabelled>
        </BoxFull>
    )
}
