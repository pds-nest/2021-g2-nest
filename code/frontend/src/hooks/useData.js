import { useCallback, useEffect, useState } from "react"


/**
 * Hook which fetches data from the backend on the first render of a component.
 *
 * @param fetchData - The function to use when fetching data.
 * @param method - The HTTP method to use.
 * @param path - The HTTP path to fetch the data at.
 * @param body - The body of the HTTP request (it will be JSONified before being sent).
 * @param init - Additional `init` parameters to pass to `fetch`.
 * @returns {{data: *, refresh: function, error: Error}}
 */
export default function useData(fetchData, method, path, body, init) {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const started = (loading || data || error)

    /**
     * Load data from the API.
     */
    const load = useCallback(
        async () => {
            console.debug(`Trying to ${method} ${path}...`)

            setLoading(true)

            try {
                const _data = await fetchData(method, path, body, init)
                setData(_data)
            } catch(e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        },
        [fetchData, method, path, body, init]
    )

    /**
     * Invalidate the data loaded from the API and try to load it again.
     */
    const refresh = useCallback(
        async () => {
            console.debug("Clearing data...")
            setData(null)

            console.debug("Clearing error...")
            setError(null)

            await load()
        },
        [load]
    )

    useEffect(
        () => {
            if(!started) {
                // noinspection JSIgnoredPromiseFromCall
                load()
            }
        },
        [load, started]
    )

    return {data, error, loading, started, refresh}
}