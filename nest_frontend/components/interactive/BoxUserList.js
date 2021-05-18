import React, { useContext } from "react"
import Loading from "../base/Loading"
import BoxFullScrollable from "../base/BoxFullScrollable"
import SummaryUser from "./SummaryUser"
import ContextLanguage from "../../contexts/ContextLanguage"


export default function BoxUserList({ users, destroyUser, running, ...props }) {
    const { strings } = useContext(ContextLanguage)

    let contents
    if(users === null) {
        contents = <Loading/>
    }
    else {
        contents = users.map(user =>
            <SummaryUser key={user["email"]} destroyUser={destroyUser} running={running} user={user}/>)
    }

    return (
        <BoxFullScrollable header={strings.userList} {...props}>
            {contents}
        </BoxFullScrollable>
    )
}
