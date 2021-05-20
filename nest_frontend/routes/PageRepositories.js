import React, { useCallback, useContext } from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"
import useBackendViewset from "../hooks/useBackendViewset"
import BoxRepositories from "../components/interactive/BoxRepositories"
import { useHistory } from "react-router"
import ContextLanguage from "../contexts/ContextLanguage"


export default function PageRepositories({ children, className, ...props }) {
    const bv = useBackendViewset("/api/v1/repositories/", "id")
    const history = useHistory()
    const { strings } = useContext(ContextLanguage)

    const archive = useCallback(
        async (pk) => {
            await bv.apiRequest("PATCH", `/api/v1/repositories/${pk}`, {
                "close": true,
            })
            await bv.retrieveResource(pk)
        },
        [bv],
    )

    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            <BoxRepositories
                header={strings.menuActive}
                loading={!bv.firstLoad}
                running={bv.running}
                repositories={bv.resources.filter(r => r.is_active)}
                view={pk => history.push(`/repositories/${pk}`)}
                archive={archive}
                edit={pk => history.push(`/repositories/${pk}/edit`)}
            />
            <BoxRepositories
                header={strings.menuArchived}
                loading={!bv.firstLoad}
                running={bv.running}
                repositories={bv.resources.filter(r => !r.is_active)}
                view={pk => history.push(`/repositories/${pk}`)}
                destroy={bv.destroyResource}
            />
        </div>
    )
}
