import React, { useContext } from "react"
import Select from "../base/Select"
import ContextTheme from "../../contexts/ContextTheme"
import ContextLanguage from "../../contexts/ContextLanguage"


/**
 * A {@link Select} which allows the user to choose between the various available themes, switching between them as soon
 * as the user selects a different one.
 *
 * @param props - Additional props to pass to the {@link Select}.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SelectTheme({ ...props }) {
    const { theme, setTheme } = useContext(ContextTheme)
    const { strings } = useContext(ContextLanguage)

    return (
        <Select value={theme} onChange={e => setTheme(e.target.value)} {...props}>
            <option value={"ThemeDark"}>{strings.darkMode}</option>
            <option value={"ThemeLight"}>{strings.lightMode}</option>
        </Select>
    )
}
