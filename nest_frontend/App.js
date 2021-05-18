import React from "react"
import Layout from "./components/interactive/Layout"
import { BrowserRouter } from "react-router-dom"
import GlobalTheme from "./components/providers/GlobalTheme"
import GlobalServer from "./components/providers/GlobalServer"
import GlobalUser from "./components/providers/GlobalUser"
import PageSwitcher from "./PageSwitcher"
import GlobalLanguage from "./components/providers/GlobalLanguage"


/**
 * The main component of the webapp, the root of the render tree, what is displayed when the web page is visited.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    return (
        <GlobalLanguage>
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
        </GlobalLanguage>
    )
}
