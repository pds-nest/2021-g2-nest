import React, { useContext } from "react"
import ContextUser from "../contexts/ContextUser"
import { Redirect } from "react-router"


export default function PageRoot() {
    const {state} = useContext(ContextUser)

    if(!state) {
        return <Redirect to={"/login"}/>
    }

    return <Redirect to={"/dashboard"}/>
}
