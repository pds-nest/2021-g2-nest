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
import { BrowserRouter } from "react-router-dom"
import { Route, Switch } from "react-router"
import PageHome from "./routes/PageHome"
import PageRepositories from "./routes/PageRepositories"
import PageAlerts from "./routes/PageAlerts"
import PageSettings from "./routes/PageSettings"


export default function App() {
    const [theme, ] = useState("ThemeDark");

    return (
        <ContextTheme.Provider value={theme}>
        <BrowserRouter>

            <div className={classNames(Style.App, theme)}>
                <Layout>
                    <Switch>
                        <Route path={"/"}>
                            <PageHome/>
                        </Route>
                        <Route path={"/repositories"}>
                            <PageRepositories/>
                        </Route>
                        <Route path={"/alerts"}>
                            <PageAlerts/>
                        </Route>
                        <Route path={"/settings"}>
                            <PageSettings/>
                        </Route>
                    </Switch>
                </Layout>
            </div>

        </BrowserRouter>
        </ContextTheme.Provider>
    )
}
