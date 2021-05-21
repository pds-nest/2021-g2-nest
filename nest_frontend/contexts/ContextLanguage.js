import { createContext } from "react"
import LocalizationStrings from "../LocalizationStrings"


/**
 * A context containing an object with the following values:
 * - `lang`: a string corresponding to the ISO 639-1 code of the current language
 * - `setLang`: a function to change the current language
 * - `strings`: an object containing all strings of the current language
 *
 * Defaults to Italian.
 */
export default createContext({
    lang: "it",
    setLang: () => console.error("Trying to setLang while outside a ContextServer.Provider!"),
    strings: LocalizationStrings.it,
})
