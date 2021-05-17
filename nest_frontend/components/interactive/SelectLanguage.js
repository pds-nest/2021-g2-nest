import React, { useState } from "react"
import Select from "../base/Select"
import Localization from "../../Localization"


/**
 * A {@link Select} which allows the user to choose between the various available themes, switching between them as soon
 * as the user selects a different one.
 *
 * @param props - Additional props to pass to the {@link Select}.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SelectLanguage({ ...props }) {
    const [_language, _setLanguage] = useState(Localization.getLanguage())

    const setLanguage = event => {
        const language = event.target.value
        console.info("Changing language to: ", language)
        Localization.setLanguage(language)
        _setLanguage(language)
    }

    return (
        <Select value={_language} onChange={setLanguage} {...props}>
            <option value={"it"}>🇮🇹 Italiano</option>
            <option value={"en"}>🇬🇧 English</option>
            <option value={"fi"}>🇫🇮 Suomi</option>
        </Select>
    )
}
