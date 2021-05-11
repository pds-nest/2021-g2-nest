import React, { useContext, useMemo, useState } from "react"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import InputWithIcon from "../base/InputWithIcon"
import { faEnvelope, faKey, faPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import FormButton from "../base/formparts/FormButton"
import BoxFull from "../base/BoxFull"
import useBackend from "../../hooks/useBackend"
import ContextUser from "../../contexts/ContextUser"
import FormAlert from "../base/formparts/FormAlert"


export default function BoxUserCreate({ children, ...props }) {
    const { fetchDataAuth } = useContext(ContextUser)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const body = useMemo(
        () => {
            return {
                "email": email,
                "username": username,
                "password": password,
            }
        },
        [email, username, password],
    )
    const { error, fetchNow: createNow } = useBackend(fetchDataAuth, "POST", "/api/v1/users/", body)

    return (
        <BoxFull header={"Crea utente"} {...props}>
            <FormLabelled>
                <FormLabel text={"Username"}>
                    <InputWithIcon
                        icon={faUser}
                        type={"text"}
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </FormLabel>
                <FormLabel text={"Email"}>
                    <InputWithIcon
                        icon={faEnvelope}
                        type={"text"}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </FormLabel>
                <FormLabel text={"Password"}>
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
                    onClick={() => createNow()}
                >
                    Create
                </FormButton>
            </FormLabelled>
            {children}
        </BoxFull>
    )
}
