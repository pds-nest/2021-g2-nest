import classNames from "classnames"
import Style from "./App.module.css"
import Layout from "./components/Layout"
import ContextTheme from "./contexts/ContextTheme"
import { BrowserRouter } from "react-router-dom"
import { Route, Switch } from "react-router"
import PageDashboard from "./routes/PageDashboard"
import PageRepositories from "./routes/PageRepositories"
import PageAlerts from "./routes/PageAlerts"
import PageSettings from "./routes/PageSettings"
import PageSandbox from "./routes/PageSandbox"
import useSavedTheme from "./hooks/useSavedTheme"
import PageLogin from "./routes/PageLogin"
import useSavedLogin from "./hooks/useSavedLogin"
import ContextLogin from "./contexts/ContextLogin"
import PageRoot from "./routes/PageRoot"


/**
 * The main component of the webapp, the root of the render tree, what is displayed when the web page is visited.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    const theme = useSavedTheme();
    const login = useSavedLogin();

    return (
        <ContextTheme.Provider value={theme}>
        <ContextLogin.Provider value={login}>
        <BrowserRouter>

            <div className={classNames(Style.App, theme)}>
                <Layout>
                    <Switch>
                        <Route path={"/login"} exact={true}>
                            <PageLogin/>
                        </Route>
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
                        <Route path={"/dashboard"} exact={true}>
                            <PageDashboard/>
                        </Route>
                        <Route path={"/"}>
                            <PageRoot/>
                        </Route>
                    </Switch>
                </Layout>
            </div>

        </BrowserRouter>
        </ContextLogin.Provider>
        </ContextTheme.Provider>
    )
}
