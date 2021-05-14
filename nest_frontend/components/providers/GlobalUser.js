import React, { useCallback, useContext } from "react"
import useLocalStorageState from "../../hooks/useLocalStorageState"
import ContextServer from "../../contexts/ContextServer"
import ContextUser from "../../contexts/ContextUser"


/**
 * Provides {@link ContextUser} to all contained elements.
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function GlobalUser({ children }) {
    const { fetchData } = useContext(ContextServer)
    const [user, setUser] = useLocalStorageState("login", null)

    /**
     * Fetch JSON data from the API as the authenticated user.
     *
     * Requires an user to be logged in!
     *
     * @param method - The HTTP method to use.
     * @param path - The path to request data at (ex. `/api/repositories`)
     * @param body - The body of the request (it will be automatically converted to JSON.
     * @param init - Additional arguments to pass to the `init` parameter of {@link fetch}.
     * @returns {Promise<*>}
     */
    const fetchDataAuth = useCallback(async (method, path, body, init) => {
        if(!user) {
            throw new Error("Non effettuato l'accesso")
        }

        if(!init) {
            init = {}
        }
        if(!init["headers"]) {
            init["headers"] = {}
        }
        init["headers"]["Authorization"] = `Bearer ${user["token"]}`

        return await fetchData(method, path, body, init)
    }, [fetchData, user])

    /**
     * Try to login to the active server with the passed credentials.
     *
     * @param email - The user's email.
     * @param password - The user's password.
     * @returns {Promise<void>}
     */
    const login = useCallback(async (email, password) => {
        console.debug("Contattando il server per accedere...")
        const data = await fetchData("POST", `/api/v1/login`, {
            "email": email,
            "password": password,
        })

        console.debug("Memorizzando lo stato di login...")
        setUser({
            email: data["user"]["email"],
            isAdmin: data["user"]["isAdmin"],
            username: data["user"]["username"],
            token: data["access_token"],
        })

        console.info("Accesso effettuato!")
    }, [fetchData, setUser])

    /**
     * Logout from the currently active server.
     */
    const logout = useCallback(() => {
        console.debug("Ripulendo lo stato di login...")
        setUser(null)
        console.debug("Stato di login ripulito!")

        console.info("Logout avvenuto con successo!")
    }, [setUser])

    return (
        <ContextUser.Provider value={{ user, login, logout, fetchDataAuth }}>
            {children}
        </ContextUser.Provider>
    )
}
