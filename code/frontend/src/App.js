import {useState} from "react"
import classNames from "classnames"
import Style from "./App.module.css"


export default function App() {
    const [theme, setTheme] = useState("theme-dark");

    return (
        <div className={classNames(Style["app"], theme)}>
            Ciao mondo!
        </div>
    )
}
