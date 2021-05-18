import { useContext } from "react"
import ContextRepositoryEditor from "../contexts/ContextRepositoryEditor"


/**
 * Hook to quickly use {@link ContextRepositoryEditor}.
 */
export default function useRepositoryEditor() {
    const context = useContext(ContextRepositoryEditor)
    if(!context) {
        throw new Error("This component must be placed inside a RepositoryEditor.")
    }
    return context
}