import {createContext} from "react";


/**
 * A context containing a list with the currently selected theme and the function to set a different one.
 *
 * The function can be `undefined` if run outside a provider.
 *
 * @type {React.Context}
 */
const ContextTheme = createContext(["ThemeDark", undefined])
export default ContextTheme
