import React from "react"
import Loading from "../components/base/Loading"
import Alert from "../components/base/Alert"
import Starting from "../components/base/Starting"


/**
 * @deprecated
 */
export default function renderContents(requestHookResults, renderFunction) {
    const { data, error, loading } = requestHookResults

    if(loading) {
        return <Loading/>
    }
    if(error) {
        return <Alert color={"Red"}>{error.toString()}</Alert>
    }
    if(data) {
        return renderFunction(data)
    }
    return <Starting/>
}
