import { useCallback, useState } from "react"


/**
 * Hook which fetches data from the backend on the first render of a component.
 *
 * @param fetchData - The function to use when fetching data.
 * @param method - The HTTP method to use.
 * @param path - The HTTP path to fetch the data at.
 * @param body - The body of the HTTP request (it will be JSONified before being sent).
 * @param init - Additional `init` parameters to pass to `fetch`.
 */
export default function useData(fetchData, method, path, body, init) {
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    /**
     * Load data from the API.
     */
    const load = useCallback(
        async () => {
            console.debug(`Loading ${method} ${path}...`)
            setLoading(true)

            console.debug(`Fetching ${method} ${path}...`)
            try {
                const _data = await fetchData(method, path, body, init)
                console.debug(`Displaying data of ${method} ${path}: `, _data)
                setData(_data)
            }
            catch(e) {
                console.debug(`Displaying error of ${method} ${path}: `, e)
                setError(e)
            }
            finally {
                console.debug(`Stopping loading of ${method} ${path}...`)
                setLoading(false)
            }
        },
        [fetchData, method, path, body, init],
    )

    /**
     * Invalidate the data loaded from the API and try to load it again.
     */
    const fetchNow = useCallback(
        async () => {
            console.debug("Clearing data...")
            setData(null)

            console.debug("Clearing error...")
            setError(null)

            await load()
        },
        [load],
    )

    return { data, error, loading, fetchNow }
}