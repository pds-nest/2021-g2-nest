import React, { useContext } from "react"
import Select from "../base/Select"
import ContextLanguage from "../../contexts/ContextLanguage"


/**
 * A {@link Select} which allows the user to choose between the various available themes, switching between them as soon
 * as the user selects a different one.
 *
 * @param props - Additional props to pass to the {@link Select}.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SelectLanguage({ ...props }) {
    const { strings, lang, setLang } = useContext(ContextLanguage)

    return (
        <Select value={lang} onChange={event => setLang(event.target.value)} {...props}>
            <option value={"it"}>🇮🇹 Italiano</option>
            <option value={"en"}>🇬🇧 English</option>
            <option value={"fi"}>🇫🇮 Suomi</option>
        </Select>
    )
}
