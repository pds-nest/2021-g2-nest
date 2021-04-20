import {useState} from "react"
import classNames from "classnames"
import Style from "./App.module.css"
import Box from "./components/Box"


export default function App() {
    const [theme, ] = useState("theme-dark");

    return (
        <div className={classNames(Style["app"], theme)}>
            <Box direction={"column"}>
                <div>
                    Ciao
                </div>
                <div>
                    mondo!
                </div>
            </Box>
        </div>
    )
}
