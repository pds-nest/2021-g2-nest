import { useContext } from "react"
import ContextRepositoryViewer from "../contexts/ContextRepositoryViewer"


/**
 * @todo Document this.
 */
export default function useRepositoryViewer() {
    const context = useContext(ContextRepositoryViewer)
    if(!context) {
        throw new Error("This component must be placed inside a RepositoryViewer.")
    }
    return context
}
