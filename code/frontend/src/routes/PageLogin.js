import React, { useContext, useState } from "react"
import Style from "./PageLogin.module.css"
import classNames from "classnames"
import BoxFull from "../components/BoxFull"
import LabelledForm from "../components/LabelledForm"
import Label from "../components/Label"
import InputWithIcon from "../components/InputWithIcon"
import { faArrowRight, faEnvelope, faGlobe, faKey } from "@fortawesome/free-solid-svg-icons"
import Button from "../components/Button"
import ContextLogin from "../contexts/ContextLogin"
import { useHistory } from "react-router"


export default function PageLogin({ className, ...props }) {
    // TODO: Change these presets before production
    const [server, setServer] = useState("http://localhost:5000")
    const [email, setEmail] = useState("admin@admin.com")
    const [password, setPassword] = useState("password")
    const {login, working, error} = useContext(ContextLogin)
    const history = useHistory()

    return (
        <div className={classNames(Style.PageLogin, className)} {...props}>
            <BoxFull header={"Login"}>
                <LabelledForm>
                    <Label text={"Server"} htmlFor={"login-server"}>
                        <InputWithIcon
                            id={"login-server"}
                            name={"login-server"}
                            value={server}
                            onChange={e => setServer(e.target.value)}
                            type={"url"}
                            icon={faGlobe}
                        />
                    </Label>
                    <Label text={"Email"} htmlFor={"login-email"}>
                        <InputWithIcon
                            id={"login-email"}
                            name={"login-email"}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type={"email"}
                            icon={faEnvelope}
                        />
                    </Label>
                    <Label text={"Password"} htmlFor={"login-password"}>
                        <InputWithIcon
                            id={"login-password"}
                            name={"login-password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={"password"}
                            icon={faKey}
                        />
                    </Label>
                    <Button
                        style={{"gridColumn": "1 / 3"}}
                        onClick={async e => {
                            await login(server, email, password)
                            history.push("/dashboard")
                        }}
                        icon={faArrowRight}
                        color={error ? "Green" : "Red"}
                        disabled={working}
                    >
                        Login
                    </Button>
                </LabelledForm>
            </BoxFull>
        </div>
    )
}
