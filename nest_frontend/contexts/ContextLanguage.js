import { createContext } from "react"


/**
 * A context containing an object with the following values:
 * - `lang`: a string corresponding to the ISO 639-1 code of the current language
 * - `setLang`: a function to change the current language
 * - `strings`: an object containing all strings of the current language
 */
export default createContext({
    lang: null,
    setLang: () => console.error("Trying to setLang while outside a ContextServer.Provider!"),
    strings: null,
})
