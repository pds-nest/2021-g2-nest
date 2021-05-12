import React, { useContext } from "react"
import Summary from "../base/Summary"
import { faStar, faTrash, faUser } from "@fortawesome/free-solid-svg-icons"
import Button from "../base/Button"
import ContextUser from "../../contexts/ContextUser"


export default function SummaryUser({ user, destroyUser, running, ...props }) {
    const { user: loggedUser } = useContext(ContextUser)

    const buttons = <>
        {loggedUser.email !== user.email ?
         <Button
             color={"Red"}
             icon={faTrash}
             onClick={async () => {
                 // TODO: Errors are not caught here. Where should they be displayed?
                 await destroyUser(user["email"])
             }}
             disabled={running}
         >
             Delete
         </Button>
                                         : null}
    </>

    return (
        <Summary
            icon={user.isAdmin ? faStar : faUser}
            title={user.username}
            subtitle={user.email}
            upperLabel={"Tipo"}
            upperValue={user.isAdmin ? "Amministratore" : "Utente"}
            buttons={buttons}
            {...props}
        />
    )
}
