import React, { useContext } from "react"
import Style from "./PageSettings.module.css"
import classNames from "classnames"
import BoxHeader from "../components/BoxHeader"
import BoxFull from "../components/BoxFull"
import SelectTheme from "../components/SelectTheme"
import ContextLogin from "../contexts/ContextLogin"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import Button from "../components/Button"
import LoggedInUser from "../components/LoggedInUser"
import { useHistory } from "react-router"


export default function PageSettings({ children, className, ...props }) {
    const {logout} = useContext(ContextLogin)
    const history = useHistory()

    return (
        <div className={classNames(Style.PageSettings, className)} {...props}>
            <BoxFull header={"Logged in"}>
                <div>
                    You are currently logged in as <LoggedInUser/>.
                </div>
                <div>
                    <Button color={"Red"} onClick={e => {
                        logout()
                        history.push("/login")
                    }} icon={faSignOutAlt}>Logout</Button>
                </div>
            </BoxFull>
            <BoxHeader>
                Switch theme: <SelectTheme/>
            </BoxHeader>
            <BoxFull header={"Alert settings"}>
                🚧 Not implemented.
            </BoxFull>
            <BoxFull header={"Change your email address"}>
                🚧 Not implemented.
            </BoxFull>
            <BoxFull header={"Change your password"}>
                🚧 Not implemented.
            </BoxFull>
        </div>
    )
}
