import {useState} from "react"
import classNames from "classnames"
import Style from "./App.module.css"
import Layout from "./components/Layout"
import ContextTheme from "./contexts/ContextTheme"
import { BrowserRouter } from "react-router-dom"
import { Route, Switch } from "react-router"
import PageHome from "./routes/PageHome"
import PageRepositories from "./routes/PageRepositories"
import PageAlerts from "./routes/PageAlerts"
import PageSettings from "./routes/PageSettings"


export default function App() {
    const loadTheme = () => {
        if(localStorage) {
            console.debug(`Loading theme from localStorage...`)
            let value = localStorage.getItem("theme")

            if(value) {
                console.debug(`Loaded theme ${value}!`)
                return value
            }
            else {
                console.debug(`There is no theme stored in the localStorage; setting to "ThemeDark"...`)
                return "ThemeDark"
            }
        }
        else {
            console.warn(`Can't load theme; localStorage doesn't seem to be available; setting to "ThemeDark"...`)
            return "ThemeDark"
        }
    }

    const [theme, _setTheme] = useState(loadTheme());

    const setTheme = (value) => {
        console.debug(`Changing theme to ${value}...`)
        _setTheme(value)
    }

    const saveTheme = (value) => {
        if(localStorage) {
            console.debug(`Saving theme ${value} to localStorage...`)
            localStorage.setItem("theme", value)
        }
        else {
            console.warn(`Can't save theme; localStorage doesn't seem to be available...`)
        }
    }

    const setAndSaveTheme = (value) => {
        setTheme(value)
        saveTheme(value)
    }

    return (
        <ContextTheme.Provider value={[theme, setAndSaveTheme]}>
        <BrowserRouter>

            <div className={classNames(Style.App, theme)}>
                <Layout>
                    <Switch>
                        <Route path={"/repositories"}>
                            <PageRepositories/>
                        </Route>
                        <Route path={"/alerts"}>
                            <PageAlerts/>
                        </Route>
                        <Route path={"/settings"}>
                            <PageSettings/>
                        </Route>
                        <Route path={"/"}>
                            <PageHome/>
                        </Route>
                    </Switch>
                </Layout>
            </div>

        </BrowserRouter>
        </ContextTheme.Provider>
    )
}
