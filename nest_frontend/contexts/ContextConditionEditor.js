import { createContext } from "react"


/**
 * React Context representing a list of {@link Condition}s as provided by {@link useArrayState}.
 *
 * It is `null` outside a RepositoryEditor.
 */
export default createContext(null)
