import React, { useCallback } from "react"
import useLocalStorageState from "../../hooks/useLocalStorageState"
import ContextLanguage from "../../contexts/ContextLanguage"
import LocalizationStrings from "../../LocalizationStrings"
import Style from "./GlobalLanguage.module.css"


/**
 * Provides {@link ContextLanguage} to all contained elements.
 *
 * Defaults to using Italian.
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function GlobalLanguage({ children }) {
    const [lang, setLang] = useLocalStorageState("language", "it")

    const getString = useCallback(
        (target, name) => {
            const languageStrings = LocalizationStrings[lang]
            const defaultStrings = LocalizationStrings["it"]

            if(languageStrings.hasOwnProperty(name)) {
                return languageStrings[name]
            }
            else if(defaultStrings.hasOwnProperty(name)) {
                console.warn("Missing ", lang, " localization for string ", name)
                return <i className={Style.MissingLocalization}>{defaultStrings[name]}</i>

            }
            else {
                console.warn("Missing string ", name)
                return <i className={Style.MissingString}>MISSING STRING</i>
            }
        },
        [lang]
    )

    const strings = new Proxy({}, {get: getString})


    return (
        <ContextLanguage.Provider value={{ lang, setLang, strings }}>
            {children}
        </ContextLanguage.Provider>
    )
}
