import { useContext } from "react"
import ContextRepositoryEditor from "../contexts/ContextRepositoryEditor"


/**
 * @todo Document this.
 */
export default function useRepositoryEditor() {
    const context = useContext(ContextRepositoryEditor)
    if(!context) {
        throw new Error("Questo componente deve essere messo in un RepositoryEditor.")
    }
    return context
}