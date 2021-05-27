import React from "react"
import { BrowserRouter } from "react-router-dom"
import GlobalTheme from "./components/providers/GlobalTheme"
import GlobalServer from "./components/providers/GlobalServer"
import GlobalUser from "./components/providers/GlobalUser"
import PageSwitcher from "./PageSwitcher"
import GlobalLanguage from "./components/providers/GlobalLanguage"
import ErrorBoundary from "./components/boundaries/ErrorBoundary"
import Sidebar from "./components/interactive/Sidebar"
import WebsiteWithSidebar from "./components/base/layout/WebsiteWithSidebar"
import Window from "./components/base/layout/Window"
import RequireSize from "./components/base/RequireSize"


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
                            <Window>
                                <RequireSize width={1366} height={768}>
                                    <WebsiteWithSidebar
                                        sidebar={<Sidebar/>}
                                    >
                                        <ErrorBoundary>
                                            <PageSwitcher/>
                                        </ErrorBoundary>
                                    </WebsiteWithSidebar>
                                </RequireSize>
                            </Window>
                        </BrowserRouter>
                    </GlobalTheme>
                </GlobalUser>
            </GlobalServer>
        </GlobalLanguage>
    )
}
