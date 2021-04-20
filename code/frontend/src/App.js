import {useState} from "react"
import classNames from "classnames"
import Style from "./App.module.css"
import BoxWithHeader from "./components/BoxWithHeader"


export default function App() {
    const [theme, ] = useState("ThemeDark");

    return (
        <div className={classNames(Style.App, theme)}>
            <BoxWithHeader
                header={{
                    children: "Ciao mondo!"
                }}
                body={{
                    children: (
                        <div>
                            <div>
                                Il CSS è pura magia.
                            </div>
                            <div>
                                Change my mind.
                            </div>
                        </div>
                    ),
                }}
            />
            <BoxWithHeader
                header={{
                    children: "Questa è un'altra Box."
                }}
                body={{
                    children: (
                        <div>
                            E altro testo.
                        </div>
                    )
                }}
            />
            <BoxWithHeader
                header={{
                    children: "Ecco, così va meglio.",
                }}
                body={{
                    children: "No."
                }}
            />
        </div>
    )
}
