import {useState} from "react"
import classNames from "classnames"
import Style from "./App.module.css"
import BoxWithHeader from "./components/BoxWithHeader"
import Button from "./components/Button"
import { faArchive, faArrowRight, faExclamationTriangle, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons"
import Input from "./components/Input"
import InputWithIcon from "./components/InputWithIcon"
import Layout from "./components/Layout"
import ContextTheme from "./contexts/ContextTheme"


export default function App() {
    const [theme, ] = useState("ThemeLight");

    return (
        <ContextTheme.Provider value={theme}>
            <div className={classNames(Style.App, theme)}>
                <Layout>
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
                            <div>
                                E già che ci siamo, un Input, con e senza icona:
                            </div>
                            <div>
                                <Input/> <InputWithIcon icon={faSearch}/>
                            </div>
                        </div>
                    </BoxWithHeader>
                </Layout>
            </div>
        </ContextTheme.Provider>
    )
}
