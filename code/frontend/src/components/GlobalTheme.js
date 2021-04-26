import React from "react"
import useLocalStorageState from "../hooks/useLocalStorageState"
import ContextTheme from "../contexts/ContextTheme"


/**
 * Provides {@link ContextTheme} to all contained elements.
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function GlobalTheme({ children }) {
    const [theme, setTheme] = useLocalStorageState("theme", "ThemeDark")

    return (
        <ContextTheme.Provider value={{theme, setTheme}}>
            {children}
        </ContextTheme.Provider>
    )
}
