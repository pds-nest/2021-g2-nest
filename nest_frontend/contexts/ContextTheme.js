import { createContext } from "react"


/**
 * A React Context containing an object with the following elements:
 * - `theme` - A string containing the name of the current theme.
 * - `setTheme` - A function that allows changing the `theme`.
 *
 * If trying to access the context from outside a provider, the theme will be `ThemeDark`, and the function will display
 * an error in the console.
 *
 * @type {React.Context}
 */
const ContextTheme = createContext({
    isSet: false,
    theme: "ThemeDark",
    setTheme: () => console.error("Trying to setTheme while outside a ContextTheme.Provider!"),
})
export default ContextTheme
