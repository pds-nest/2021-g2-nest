import React, { useContext } from "react"
import ContextLogin from "../contexts/ContextLogin"
import { Redirect } from "react-router"


export default function PageRoot() {
    const {state} = useContext(ContextLogin)

    if(!state) {
        return <Redirect to={"/login"}/>
    }

    return <Redirect to={"/dashboard"}/>
}
