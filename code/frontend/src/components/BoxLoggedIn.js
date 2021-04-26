import React, { useContext } from "react"
import BoxFull from "./BoxFull"
import LoggedInUser from "./LoggedInUser"
import Button from "./Button"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import ContextLogin from "../contexts/ContextLogin"
import { useHistory } from "react-router"
import Style from "./BoxLoggedIn.module.css"


export default function BoxLoggedIn({ ...props }) {
    const {logout} = useContext(ContextLogin)
    const history = useHistory()

    return (
        <BoxFull header={"Logged in"} {...props}>
            <div className={Style.BoxLoggedInContents}>
                <div>
                    You are currently logged in as <LoggedInUser/>.
                </div>
                <div>
                    <Button color={"Red"} onClick={e => {
                        logout()
                        history.push("/login")
                    }} icon={faSignOutAlt}>Logout</Button>
                </div>
            </div>
        </BoxFull>
    )
}
