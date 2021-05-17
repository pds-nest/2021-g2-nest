import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import LoggedInUser from "./LoggedInUser"
import Button from "../base/Button"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import ContextUser from "../../contexts/ContextUser"
import { useHistory } from "react-router"
import Style from "./BoxLoggedIn.module.css"
import CurrentServer from "./CurrentServer"
import Localization from "../../Localization"


/**
 * A {@link BoxFull} displaying the user's current login status, and allowing them to logout.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxLoggedIn({ ...props }) {
    const { logout } = useContext(ContextUser)
    const history = useHistory()

    return (
        <BoxFull header={Localization.loggedInTitle} {...props}>
            <div className={Style.BoxLoggedInContents}>
                <div>
                    {Localization.loggedInOn} <CurrentServer/> {Localization.loggedInAs} <LoggedInUser/>.
                </div>
                <div>
                    <Button
                        color={"Red"} onClick={() => {
                        logout()
                        history.push("/login")
                    }} icon={faSignOutAlt}
                    >{Localization.logout}</Button>
                </div>
            </div>
        </BoxFull>
    )
}
