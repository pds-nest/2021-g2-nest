import { useContext } from "react"
import ContextRepositoryEditor from "../contexts/ContextRepositoryEditor"
import ContextRepositoryViewer from "../contexts/ContextRepositoryViewer"


/**
 * Hook to quickly use {@link ContextRepositoryEditor}.
 */
export default function useRepositoryViewer() {
    const context = useContext(ContextRepositoryViewer)
    if(!context) {
        throw new Error("This component must be placed inside a RepositoryViewer.")
    }
    return context
}