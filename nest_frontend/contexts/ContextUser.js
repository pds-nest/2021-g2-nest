import { createContext } from "react"


/**
 * A React Context containing an object with the following values:
 * - `user`: an object containing data about the currently logged in user
 * - `login`: a function accepting `email, password` as parameters which tries to login the user
 * - `logout`: a function accepting no parameters which logs the user out
 * - `fetchDataAuth`: a function with the same API as `fetchData` which fetches data from the server authenticating
 *   as the logged in user.
 *
 * If accessed from outside a provider, the values will be:
 * - `user`: `null`
 * - `login`: a function showing an error in the console
 * - `logout`: another function showing an error in the console
 * - `fetchDataAuth`: yet another function showing an error in the console
 *
 * @type {React.Context}
 */
const ContextUser = createContext({
    user: null,
    login: () => console.error("Trying to login while outside a ContextUser.Provider!"),
    logout: () => console.error("Trying to logout while outside a ContextUser.Provider!"),
    fetchDataAuth: () => console.error("Trying to fetchDataAuth while outside a ContextUser.Provider!"),
})
export default ContextUser
