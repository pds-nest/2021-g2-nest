import Layout from "./components/Layout"
import { BrowserRouter } from "react-router-dom"
import { Route, Switch } from "react-router"
import PageDashboard from "./routes/PageDashboard"
import PageRepositories from "./routes/PageRepositories"
import PageAlerts from "./routes/PageAlerts"
import PageSettings from "./routes/PageSettings"
import PageSandbox from "./routes/PageSandbox"
import PageLogin from "./routes/PageLogin"
import PageRoot from "./routes/PageRoot"
import GlobalTheme from "./components/GlobalTheme"
import GlobalServer from "./components/GlobalServer"
import GlobalUser from "./components/GlobalUser"
import PageSwitcher from "./PageSwitcher"


/**
 * The main component of the webapp, the root of the render tree, what is displayed when the web page is visited.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    return (
        <GlobalServer>
            <GlobalUser>
                <GlobalTheme>
                    <BrowserRouter>
                        <Layout>
                            <PageSwitcher/>
                        </Layout>
                    </BrowserRouter>
                </GlobalTheme>
            </GlobalUser>
        </GlobalServer>
    )
}
