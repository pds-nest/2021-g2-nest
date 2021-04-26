import {createContext} from "react";


/**
 * A context containing an object with the following values:
 * - `state`: `null` if the user is not logged in, otherwise an object containing:
 *   - `server`: The base url of the N.E.S.T. backend
 *   - `email`: The email of the account the user is logged in as
 *   - `token`: The bearer token to use in authenticated API requests
 * - `working`: `true` if the login procedure is running, `false` otherwise
 * - `error`: `null` if no login error happened, an instance of {@link Error} otherwise.
 * - `login`: an async function which logs in the user if given the following parameters: `server, email, password`
 * - `logout`: a function which logs out the user
 * - `fetch_unauth`: a variant of {@link fetch} which uses `state.server` as the base url, allowing only the API path
 *   to be passed
 * - `fetch_auth`: a variant of {@link fetch_unauth} which automatically passes the correct `Authentication` header
 *
 * @type {React.Context}
 */
const ContextLogin = createContext(null)
export default ContextLogin
