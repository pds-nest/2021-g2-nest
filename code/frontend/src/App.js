import {useState} from "react"
import classNames from "classnames"
import Style from "./App.module.css"
import BoxWithHeader from "./components/BoxWithHeader"


export default function App() {
    const [theme, ] = useState("ThemeDark");

    return (
        <div className={classNames(Style.App, theme)}>
            <BoxWithHeader
                header={"Ciao mondo!"}
            >
                <div>
                    <div>
                        Il CSS è pura magia.
                    </div>
                    <div>
                        Change my mind.
                    </div>
                </div>
            </BoxWithHeader>
            <BoxWithHeader
                header={"Questa è un'altra Box."}
                body={
                    <div>
                        E altro testo.
                    </div>
                }
            />
            <BoxWithHeader
                header={"Ecco, così va meglio."}
                body={"No."}
            />
        </div>
    )
}
