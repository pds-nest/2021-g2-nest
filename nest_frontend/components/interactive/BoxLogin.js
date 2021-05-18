import React, { useContext, useState } from "react"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import InputWithIcon from "../base/InputWithIcon"
import { faArrowRight, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons"
import BoxFull from "../base/BoxFull"
import FormButton from "../base/formparts/FormButton"
import ContextUser from "../../contexts/ContextUser"
import { useHistory } from "react-router"
import FormAlert from "../base/formparts/FormAlert"
import ContextLanguage from "../../contexts/ContextLanguage"


/**
 * A {@link BoxFull} allowing the user to login.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxLogin({ ...props }) {
    const [email, setEmail] = useState("admin@admin.com")
    const [password, setPassword] = useState("password")
    const [working, setWorking] = useState(false)
    const [error, setError] = useState(null)
    const { login } = useContext(ContextUser)
    const history = useHistory()
    const {strings} = useContext(ContextLanguage)

    const doLogin = async () => {
        if(working) {
            return
        }

        setWorking(true)
        try {
            await login(email, password)
            history.push("/dashboard")
        }
        catch(e) {
            setError(e)
        }
        finally {
            setWorking(false)
        }
    }

    return (
        <BoxFull header={strings.login} {...props}>
            <FormLabelled>
                <FormLabel text={strings.email} htmlFor={"login-email"}>
                    <InputWithIcon
                        id={"login-email"}
                        name={"login-email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type={"email"}
                        icon={faEnvelope}
                    />
                </FormLabel>
                <FormLabel text={strings.passwd} htmlFor={"login-password"}>
                    <InputWithIcon
                        id={"login-password"}
                        name={"login-password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={"password"}
                        icon={faKey}
                    />
                </FormLabel>
                {error ?
                 <FormAlert color={"Red"}>
                     {error.toString()}
                 </FormAlert>
                       : null}
                <FormButton
                    onClick={doLogin}
                    icon={faArrowRight}
                    color={"Green"}
                    disabled={working}
                >
                    {strings.login}
                </FormButton>
            </FormLabelled>
        </BoxFull>
    )
}
