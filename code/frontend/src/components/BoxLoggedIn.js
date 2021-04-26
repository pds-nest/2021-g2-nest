import React, { useContext } from "react"
import BoxFull from "./BoxFull"
import LoggedInUser from "./LoggedInUser"
import Button from "./Button"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import ContextUser from "../contexts/ContextUser"
import { useHistory } from "react-router"
import Style from "./BoxLoggedIn.module.css"
import CurrentServer from "./CurrentServer"


/**
 * A {@link BoxFull} displaying the user's current login status, and allowing them to logout.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxLoggedIn({ ...props }) {
    const {logout} = useContext(ContextUser)
    const history = useHistory()

    return (
        <BoxFull header={"Logged in"} {...props}>
            <div className={Style.BoxLoggedInContents}>
                <div>
                    You are currently logged in at <CurrentServer/> as <LoggedInUser/>.
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
