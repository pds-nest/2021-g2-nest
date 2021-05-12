import { useCallback, useContext, useEffect, useState } from "react"
import ContextServer from "../contexts/ContextServer"
import ContextUser from "../contexts/ContextUser"
import makeURLSearchParams from "../utils/makeURLSearchParams"


export default function useBackendViewset(resourcesPath, pkName) {
    const { server } = useContext(ContextServer)
    const configured = server !== null

    const { user } = useContext(ContextUser)
    const loggedIn = user !== null

    const [abort, setAbort] = useState(null)
    const running = abort !== null

    const [resources, setResources] = useState(null)
    const loaded = resources !== null

    const apiRequest = useCallback(
        async (method, path, body, init = {}) => {
            // Check if server is configured
            if(!configured) {
                throw new Error(`Backend server not configured.`)
            }

            // Check if something is not already being loaded
            if(running) {
                throw new Error(`A request is already running.`)
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

            // Check if the request was successful
            if(!response.ok) {
                throw new Error(`${method} ${path} failed with status code ${response.status} ${response.statusText}`)
            }

            // If the response is 204 NO CONTENT, return null
            if(response.status === 204) {
                return null
            }

            // Otherwise, try parsing the response as JSON
            const json = await response.json()

            // Check if the JSON contains a success
            if(json["result"] !== "success") {
                throw new Error(`${method} ${path} failed with message ${json["msg"]}`)
            }

            return json["data"]
        },
        [server, configured, running, loggedIn, user, setAbort],
    )

    const apiList = useCallback(
        async (init) => await apiRequest("GET", `${resourcesPath}`, undefined, init),
        [apiRequest, resourcesPath],
    )

    const apiRetrieve = useCallback(
        async (id, init) => await apiRequest("GET", `${resourcesPath}${id}`, undefined, init),
        [apiRequest, resourcesPath],
    )

    const apiCreate = useCallback(
        async (data, init) => await apiRequest("POST", `${resourcesPath}`, data, init),
        [apiRequest, resourcesPath],
    )

    const apiEdit = useCallback(
        async (id, data, init) => await apiRequest("PUT", `${resourcesPath}${id}`, data, init),
        [apiRequest, resourcesPath],
    )

    const apiDestroy = useCallback(
        async (id, init) => await apiRequest("DELETE", `${resourcesPath}${id}`, undefined, init),
        [apiRequest, resourcesPath],
    )

    const refreshResources = useCallback(
        async () => {
            try {
                setResources(await apiList())
            }
            catch(e) {
                return { error: e }
            }
            return {}
        },
        [apiList],
    )

    const refreshResource = useCallback(
        async (pk) => {
            try {
                const refreshedResource = await apiRetrieve(pk)
                setResources(resources => resources.map(resource => {
                    if(resource[pkName] === pk) {
                        return refreshedResource
                    }
                    return resource
                }))
            }
            catch(e) {
                return { error: e }
            }
            return {}
        },
        [apiRetrieve, pkName]
    )

    const createResource = useCallback(
        async (data) => {
            try {
                const newResource = await apiCreate(data)
                setResources(resources => [...resources, newResource])
            }
            catch(e) {
                return { error: e }
            }
            return {}
        },
        [apiCreate],
    )

    const editResource = useCallback(
        async (pk, data) => {
            try {
                const editedResource = await apiEdit(pk, data)
                setResources(resources => resources.map(resource => {
                    if(resource[pkName] === pk) {
                        return editedResource
                    }
                    return resource
                }))
            }
            catch(e) {
                return { error: e }
            }
            return {}
        },
        [apiEdit, pkName],
    )

    const destroyResource = useCallback(
        async (pk) => {
            try {
                await apiDestroy(pk)
                setResources(resources => resources.filter(resource => resource[pkName] !== pk))
            }
            catch(e) {
                return { error: e }
            }
            return {}
        },
        [apiDestroy, pkName],
    )

    useEffect(
        () => {
            if(!(
                loaded || running
            )) {
                // noinspection JSIgnoredPromiseFromCall
                refreshResources()
            }
        },
        [loaded, refreshResources, running],
    )

    return {
        abort,
        resources,
        running,
        loaded,
        apiRequest,
        apiList,
        apiRetrieve,
        apiCreate,
        apiEdit,
        apiDestroy,
        refreshResources,
        refreshResource,
        createResource,
        editResource,
        destroyResource,
    }
}