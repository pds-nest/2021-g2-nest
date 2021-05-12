import React from "react"
import Loading from "../base/Loading"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryUser from "./SummaryUser"


export default function BoxUserList({ users, destroyUser, running, ...props }) {
    let contents
    if(users === null) {
        contents = <Loading/>
    }
    else {
        contents = users.map(user =>
            <SummaryUser key={user["email"]} destroyUser={destroyUser} running={running} user={user}/>)
    }

    return (
        <BoxFullScrollable header={"Elenco utenti"} {...props}>
            {contents}
        </BoxFullScrollable>
    )
}
