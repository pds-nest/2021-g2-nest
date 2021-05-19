import { useCallback, useContext, useState } from "react"
import ContextServer from "../contexts/ContextServer"
import ContextUser from "../contexts/ContextUser"
import makeURLSearchParams from "../utils/makeURLSearchParams"


/**
 * An hook which provides the apiRequest method to send request to the backend REST API.
 */
export default function useBackendRequest() {
    const { server } = useContext(ContextServer)
    const configured = server !== null

    const { user } = useContext(ContextUser)
    const loggedIn = user !== null

    const [abort, setAbort] = useState(null)
    const running = abort !== null

    const apiRequest = useCallback(
        async (method, path, body, init = {}) => {
            // Check if server is configured
            if(!configured) {
                throw new ServerNotConfiguredError()
            }

            // Check if something is not already being loaded
            if(running) {
                throw new FetchAlreadyRunningError()
            }

            // Ensure init has certain sub-objects
            if(!init["headers"]) {
                init["headers"] = {}
            }

            // If the user is logged in, add the Authorization headers
            if(loggedIn) {
                init["headers"]["Authorization"] = `Bearer ${user.token}`
            }

            // Set the Content-Type header
            init["headers"]["Content-Type"] = "application/json"

            // Use the body param as either search parameter or request body
            if(body) {
                if(["GET", "HEAD"].includes(method.toUpperCase())) {
                    path += makeURLSearchParams(body).toString()
                }
                else {
                    init["body"] = JSON.stringify(body)
                }
            }

            // Set the method
            init["method"] = method

            // Create a new abort handler in case the request needs to be aborted
            const thisAbort = new AbortController()
            init["signal"] = thisAbort.signal
            setAbort(thisAbort)

            // Fetch the resource
            const response = await fetch(`${server}${path}`, init)

            // Clear the abort handler
            setAbort(null)

            // If the response is 204 NO CONTENT, return null
            if(response.status === 204) {
                return null
            }

            // Otherwise, try parsing the response as JSON
            let json
            try {
                json = await response.json()
            }
            catch (error) {
                throw new DecodeError(response.status, response.statusText, error)
            }

            // Check if the JSON contains a success
            if(json["result"] !== "success") {
                throw new ResultError(response.status, response.statusText, json)
            }

            return json["data"]
        },
        [server, configured, running, loggedIn, user, setAbort],
    )

    return {
        abort,
        running,
        apiRequest,
    }
}