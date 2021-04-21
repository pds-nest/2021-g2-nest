import React, {useContext} from "react"
import Select from "./Select"
import ContextTheme from "../contexts/ContextTheme"


export default function SelectTheme({ children, ...props }) {
    const [theme, setTheme] = useContext(ContextTheme);

    return (
        <Select value={theme} onChange={e => setTheme(e.target.value)} {...props}>
            <option value={"ThemeDark"}>Dark</option>
            <option value={"ThemeLight"}>Light</option>
        </Select>
    )
}
