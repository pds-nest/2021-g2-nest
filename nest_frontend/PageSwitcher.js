import React from "react"
import { Route, Switch } from "react-router"
import PageLogin from "./routes/PageLogin"
import PageRepositoriesList from "./routes/PageRepositoriesList"
import PageRepositoryAlerts from "./routes/PageRepositoryAlerts"
import PageSettings from "./routes/PageSettings"
import PageRepositoryCreate from "./routes/PageRepositoryCreate"
import PageRepositoryEdit from "./routes/PageRepositoryEdit"
import PageUsers from "./routes/PageUsers"
import PageRepositoryAnalyze from "./routes/PageRepositoryAnalyze"
import PageShare from "./routes/PageShare"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"
import makeIcon from "./utils/makeIcon"
import useStrings from "./hooks/useStrings"
import Alert from "./components/base/Alert"
import PageRepositoryAlertsCreate from "./routes/PageRepositoryAlertsCreate"


export default function PageSwitcher({ ...props }) {
    const strings = useStrings()

    return (
        <Switch {...props}>
            <Route path={"/repositories/create"} exact={true}>
                <PageRepositoryCreate/>
            </Route>
            <Route path={"/repositories/:id/alerts/create"} exact={true}>
                <PageRepositoryAlertsCreate/>
            </Route>
            <Route path={"/repositories/:id/alerts/"} exact={true}>
                <PageRepositoryAlerts/>
            </Route>
            <Route path={"/repositories/:id/share"} exact={true}>
                <PageShare/>
            </Route>
            <Route path={"/repositories/:id/edit"} exact={true}>
                <PageRepositoryEdit/>
            </Route>
            <Route path={"/repositories/:id"} exact={true}>
                <PageRepositoryAnalyze/>
            </Route>
            <Route path={"/users"} exact={true}>
                <PageUsers/>
            </Route>
            <Route path={"/repositories"} exact={true}>
                <PageRepositoriesList/>
            </Route>
            <Route path={"/settings"} exact={true}>
                <PageSettings/>
            </Route>
            <Route path={"/"} exact={true}>
                <PageLogin/>
            </Route>
            <Route>
                <Alert color={"Red"}>{makeIcon(faQuestionCircle)} {strings.errorPageNotFound}</Alert>
            </Route>
        </Switch>
    )
}
