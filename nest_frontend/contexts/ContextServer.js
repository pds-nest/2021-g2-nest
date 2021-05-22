import { createContext } from "react"


/**
 * A React Context containing an object with the following values:
 * - `server`: the base URL of the currently active backend server
 * - `setServer`: a function to change `server`
 * - `fetchData`: a function to fetch JSON data from the backend server
 *
 * If accessed from outside a provider, the values will be:
 * - `server`: `null`
 * - `setServer`: a function showing an error in the console
 * - `fetchData`: another function showing an error in the console
 *
 * @type {React.Context}
 */
const ContextServer = createContext({
    server: null,
    setServer: () => console.error("Trying to setServer while outside a ContextServer.Provider!"),
    fetchData: () => console.error("Trying to fetchData while outside a ContextServer.Provider!"),
})
export default ContextServer
