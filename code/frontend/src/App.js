import {useState} from "react"
import classNames from "classnames"
import Style from "./App.module.css"
import BoxWithHeader from "./components/BoxWithHeader"
import Button from "./components/Button"
import { faArchive, faArrowRight, faExclamationTriangle, faTrash } from "@fortawesome/free-solid-svg-icons"


export default function App() {
    const [theme, ] = useState("ThemeDark");

    return (
        <div className={classNames(Style.App, theme)}>
            <BoxWithHeader
                header={"Sto provando i bottoni!"}
            >
                <div>
                    <div>
                        Ammirate:
                    </div>
                    <div>
                        <Button color={"Green"} icon={faArrowRight}>Verde</Button>
                        <Button color={"Grey"} icon={faArchive}>Grigio</Button>
                        <Button color={"Yellow"} icon={faExclamationTriangle}>Giallo</Button>
                        <Button color={"Red"} icon={faTrash}>Rosso</Button>
                    </div>
                </div>
            </BoxWithHeader>
        </div>
    )
}
