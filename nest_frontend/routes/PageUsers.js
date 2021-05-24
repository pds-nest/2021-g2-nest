import React, { useContext } from "react"
import Style from "./PageUsers.module.css"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import BoxUserCreate from "../components/interactive/BoxUserCreate"
import useBackendViewset from "../hooks/useBackendViewset"
import BoxUserList from "../components/interactive/BoxUserList"
import ContextLanguage from "../contexts/ContextLanguage"
import BoxAlert from "../components/base/BoxAlert"


export default function PageUsers({ children, className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    const bv = useBackendViewset("/api/v1/users/", "email")

    return (
        <div className={classNames(Style.PageUsers, className)} {...props}>
            <BoxHeader className={Style.Header}>
                {strings.manageUsers}
            </BoxHeader>
            <BoxUserCreate className={Style.CreateUser} createUser={bv.createResource} running={bv.running}/>
            <BoxUserList className={Style.UserList} users={bv.resources} destroyUser={bv.destroyResource} running={bv.running}/>
            {bv.error ?
                <BoxAlert className={Style.Error} color={"red"}>{strings[bv.error?.data?.code ?? "errorUnknownError"]}</BoxAlert>
            : null}
        </div>
    )
}
