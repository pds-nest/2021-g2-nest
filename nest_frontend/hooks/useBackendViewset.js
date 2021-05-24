import { useCallback, useEffect, useState } from "react"
import useBackendRequest from "./useBackendRequest"
import { ViewNotAllowedError } from "../objects/Errors"


/**
 * An hook which allows access to a full REST viewset (list, create, retrieve, edit, delete).
 *
 * @param resourcesPath - The path of the resource directory.
 * @param pkName - The name of the primary key attribute of the elements.
 * @param allowViews - An object with maps views to a boolean detailing if they're allowed in the viewset or not.
 */
export default function useBackendViewset(resourcesPath, pkName,
                                          {
                                              list: allowList = true,
                                              create: allowCreate = true,
                                              retrieve: allowRetrieve = true,
                                              edit: allowEdit = true,
                                              destroy: allowDestroy = true,
                                              command: allowCommand = false,
                                              action: allowAction = false,
                                          } = {},
) {
    const { abort, running, apiRequest } = useBackendRequest()

    const [firstLoad, setFirstLoad] = useState(false)
    const [resources, setResources] = useState([])
    const [error, setError] = useState(null)

    const apiList = useCallback(
        async (init) => {
            if(!allowList) {
                throw new ViewNotAllowedError("list")
            }
            return apiRequest("GET", `${resourcesPath}`, undefined, init)
        },
        [apiRequest, allowList, resourcesPath],
    )

    const apiRetrieve = useCallback(
        async (id, init) => {
            if(!allowRetrieve) {
                throw new ViewNotAllowedError("retrieve")
            }
            return apiRequest("GET", `${resourcesPath}${id}`, undefined, init)
        },
        [apiRequest, allowRetrieve, resourcesPath],
    )

    const apiCreate = useCallback(
        async (data, init) => {
            if(!allowCreate) {
                throw new ViewNotAllowedError("create")
            }
            return apiRequest("POST", `${resourcesPath}`, data, init)
        },
        [apiRequest, allowCreate, resourcesPath],
    )

    const apiEdit = useCallback(
        async (id, data, init) => {
            if(!allowEdit) {
                throw new ViewNotAllowedError("edit")
            }
            return apiRequest("PUT", `${resourcesPath}${id}`, data, init)
        },
        [apiRequest, allowEdit, resourcesPath],
    )

    const apiDestroy = useCallback(
        async (id, init) => {
            if(!allowDestroy) {
                throw new ViewNotAllowedError("destroy")
            }
            return apiRequest("DELETE", `${resourcesPath}${id}`, undefined, init)
        },
        [apiRequest, allowDestroy, resourcesPath],
    )

    const apiCommand = useCallback(
        async (method, command, data, init) => {
            if(!allowCommand) {
                throw new ViewNotAllowedError("command")
            }
            return apiRequest(method, `${resourcesPath}${command}`, data, init)
        },
        [apiRequest, allowCommand, resourcesPath],
    )

    const apiAction = useCallback(
        async (method, id, command, data, init) => {
            if(!allowAction) {
                throw new ViewNotAllowedError("action")
            }
            return apiRequest(method, `${resourcesPath}${id}/${command}`, data, init)
        },
        [apiRequest, allowAction, resourcesPath],
    )

    const listResources = useCallback(
        async () => {
            let res
            try {
                res = await apiList()
            }
            catch(e) {
                setError(e)
                return
            }
            setError(null)
            setResources(res)
        },
        [apiList],
    )

    const retrieveResource = useCallback(
        async (pk) => {
            let res
            try {
                res = await apiRetrieve(pk)
            }
            catch(e) {
                setError(e)
                return
            }
            setError(null)

            setResources(r => r.map(resource => {
                if(resource[pkName] === pk) {
                    return res
                }
                return resource
            }))

            return res
        },
        [apiRetrieve, pkName],
    )

    const createResource = useCallback(
        async (data) => {
            let res
            try {
                res = await apiCreate(data)
            }
            catch(e) {
                setError(e)
                return
            }
            setError(null)

            setResources(r => [...r, res])
            return res
        },
        [apiCreate],
    )

    const editResource = useCallback(
        async (pk, data) => {
            let res
            try {
                res = await apiEdit(pk, data)
            }
            catch(e) {
                setError(e)
                return
            }
            setError(null)

            setResources(r => r.map(resource => {
                if(resource[pkName] === pk) {
                    return res
                }
                return resource
            }))
            return res
        },
        [apiEdit, pkName],
    )

    const destroyResource = useCallback(
        async (pk) => {
            try {
                await apiDestroy(pk)
            }
            catch(e) {
                setError(e)
                return
            }
            setError(null)

            setResources(r => r.filter(resource => resource[pkName] !== pk))
            return null
        },
        [apiDestroy, pkName],
    )

    useEffect(
        async () => {
            if(allowList && !firstLoad && !running) {
                await listResources()
                setFirstLoad(true)
            }
        },
        [listResources, firstLoad, running, allowList],
    )

    return {
        abort,
        resources,
        firstLoad,
        running,
        error,
        apiRequest,
        allowList,
        apiList,
        listResources,
        allowRetrieve,
        apiRetrieve,
        retrieveResource,
        allowCreate,
        apiCreate,
        createResource,
        allowEdit,
        apiEdit,
        editResource,
        allowDestroy,
        apiDestroy,
        destroyResource,
        apiCommand,
        apiAction,
    }
}