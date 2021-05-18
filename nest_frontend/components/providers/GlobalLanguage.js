import React  from "react"
import useLocalStorageState from "../../hooks/useLocalStorageState"
import ContextLanguage from "../../contexts/ContextLanguage"
import LocalizationStrings from "../../LocalizationStrings"


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

    const strings = LocalizationStrings[lang]

    return (
        <ContextLanguage.Provider value={{ lang, setLang, strings }}>
            {children}
        </ContextLanguage.Provider>
    )
}
