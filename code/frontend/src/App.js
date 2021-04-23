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
import PageSandbox from "./routes/PageSandbox"
import useSavedTheme from "./hooks/useSavedTheme"


/**
 * The main component of the webapp, the root of the render tree, what is displayed when the web page is visited.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    const [theme, setAndSaveTheme] = useSavedTheme();

    return (
        <ContextTheme.Provider value={[theme, setAndSaveTheme]}>
        <BrowserRouter>

            <div className={classNames(Style.App, theme)}>
                <Layout>
                    <Switch>
                        <Route path={"/repositories"} exact={true}>
                            <PageRepositories/>
                        </Route>
                        <Route path={"/alerts"} exact={true}>
                            <PageAlerts/>
                        </Route>
                        <Route path={"/settings"} exact={true}>
                            <PageSettings/>
                        </Route>
                        <Route path={"/sandbox"} exact={true}>
                            <PageSandbox/>
                        </Route>
                        <Route path={"/"} exact={true}>
                            <PageHome/>
                        </Route>
                    </Switch>
                </Layout>
            </div>

        </BrowserRouter>
        </ContextTheme.Provider>
    )
}
