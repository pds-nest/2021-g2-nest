import { useCallback, useEffect, useState } from "react"
import useBackendRequest from "./useBackendRequest"


/**
 * An hook which allows access to a full REST resource (retrieve, edit, delete).
 *
 * @param resourcePath - The path of the resource file.
 * @param allowViews - An object with maps views to a boolean detailing if they're allowed in the viewset or not.
 */
export default function useBackendResource(
    resourcePath,
    {
        retrieve: allowRetrieve = true,
        edit: allowEdit = true,
        destroy: allowDestroy = true,
        action: allowAction = false,
    } = {},
) {

    const { abort, running, apiRequest } = useBackendRequest()

    const [firstLoad, setFirstLoad] = useState(false)
    const [resource, setResource] = useState(null)
    const [error, setError] = useState(null)

    const apiRetrieve = useCallback(
        async (init) => {
            if(!allowRetrieve) {
                throw new ViewNotAllowedError("retrieve")
            }
            return apiRequest("GET", `${resourcePath}`, undefined, init)
        },
        [apiRequest, allowRetrieve, resourcePath],
    )

    const apiEdit = useCallback(
        async (data, init) => {
            if(!allowEdit) {
                throw new ViewNotAllowedError("edit")
            }
            return apiRequest("PUT", `${resourcePath}`, data, init)
        },
        [apiRequest, allowEdit, resourcePath],
    )

    const apiDestroy = useCallback(
        async (init) => {
            if(!allowDestroy) {
                throw new ViewNotAllowedError("destroy")
            }
            return apiRequest("DELETE", `${resourcePath}`, undefined, init)
        },
        [apiRequest, allowDestroy, resourcePath],
    )

    const apiAction = useCallback(
        async (method, command, data, init) => {
            if(!allowAction) {
                throw new ViewNotAllowedError("action")
            }
            return apiRequest(method, `${resourcePath}/${command}`, data, init)
        },
        [apiRequest, allowAction, resourcePath],
    )

    const retrieveResource = useCallback(
        async (pk) => {
            let refreshedResource
            try {
                refreshedResource = await apiRetrieve(pk)
            }
            catch(e) {
                setError(e)
                throw e
            }
            setError(null)
            setResource(refreshedResource)
            return refreshedResource
        },
        [apiRetrieve],
    )

    const editResource = useCallback(
        async (pk, data) => {
            let editedResource
            try {
                editedResource = await apiEdit(pk, data)
            }
            catch(e) {
                setError(e)
                throw e
            }
            setError(null)
            setResource(editedResource)
            return editedResource
        },
        [apiEdit],
    )

    const destroyResource = useCallback(
        async (pk) => {
            try {
                await apiDestroy(pk)
            }
            catch(e) {
                setError(e)
                throw e
            }
            setError(null)
            setResource(null)
            return null
        },
        [apiDestroy],
    )

    useEffect(
        async () => {
            if(allowRetrieve && !firstLoad && !running) {
                // noinspection JSIgnoredPromiseFromCall
                await retrieveResource()
                setFirstLoad(true)
            }
        },
        [retrieveResource, firstLoad, running, allowRetrieve],
    )

    return {
        abort,
        resource,
        running,
        firstLoad,
        error,
        apiRequest,
        allowRetrieve,
        apiRetrieve,
        retrieveResource,
        allowEdit,
        apiEdit,
        editResource,
        allowDestroy,
        apiDestroy,
        destroyResource,
        apiAction,
    }
}