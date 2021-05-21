import { useContext } from "react"
import ContextLanguage from "../contexts/ContextLanguage"


/**
 * Hook to quickly use the strings of {@link ContextLanguage}.
 */
export default function useStrings() {
    return useContext(ContextLanguage).strings
}