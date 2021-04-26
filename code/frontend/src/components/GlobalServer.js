import React from "react"
import useLocalStorageState from "../hooks/useLocalStorageState"
import ContextServer from "../contexts/ContextServer"


/**
 * Provides {@link ContextServer} to all contained elements.
 *
 * Defaults to using `http://127.0.0.1:5000` as server address.
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function GlobalServer({ children }) {
    const [server, setServer] = useLocalStorageState("server", "http://127.0.0.1:5000")

    /**
     * Fetch JSON data from the API.
     *
     * @param method - The method to use.
     * @param path - The path to request data at (ex. `/api/repositories`)
     * @param body - The body of the request (it will be automatically converted to JSON.
     * @param init - Additional arguments to pass to the `init` parameter of {@link fetch}.
     * @returns {Promise<*>}
     */
    const fetchData = async (method, path, body, init) => {
        if(!server) {
            throw new Error(`Invalid server: ${server}`)
        }

        if(!init) {
            init = {}
        }
        if(!init["headers"]) {
            init["headers"] = {}
        }
        init["headers"]["Content-Type"] = "application/json"

        const response = await fetch(`${server}${path}`, {
            method: method,
            body: JSON.stringify(body),
            ...init,
        })

        if(response.status >= 500) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`)
        }

        const json = await response.json()

        if(json["result"] !== "success") {
            throw new Error(`Request failed: ${json["msg"]}`)
        }

        return json["data"]
    }

    return (
        <ContextServer.Provider value={{server, setServer, fetchData}}>
            {children}
        </ContextServer.Provider>
    )
}
