import { createContext } from "react"


/**
 * A context containing an object with the following values:
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
    setServer: () => console.error("Provato ad eseguire setServer mentre fuori da un ContextServer.Provider!"),
    fetchData: () => console.error("Provato ad eseguire fetchData mentre fuori da un ContextServer.Provider!"),
})
export default ContextServer
