import React, { useCallback, useContext } from "react"
import Style from "./PageRepositories.module.css"
import classNames from "classnames"
import BoxRepositoriesActive from "../components/interactive/BoxRepositoriesActive"
import BoxRepositoriesArchived from "../components/interactive/BoxRepositoriesArchived"
import useBackendViewset from "../hooks/useBackendViewset"


export default function PageRepositories({ children, className, ...props }) {
    const bv = useBackendViewset("/api/v1/repositories/", "id")

    const archiveRepository = useCallback(
        async (pk) => {
            try {
                await bv.apiRequest("PATCH", `/api/v1/repositories/${pk}`, {
                    "close": true,
                })
                await bv.refreshResource(pk)
            }
            catch(e) {
                return { error: e }
            }
            return {}
        },
        [bv.apiRequest, bv.refreshResource]
    )

    return (
        <div className={classNames(Style.PageRepositories, className)} {...props}>
            <BoxRepositoriesActive
                repositories={bv.loaded ? bv.resources.filter(r => r.is_active) : null}
                archiveRepository={archiveRepository}
                destroyRepository={bv.destroyResource}
                running={bv.running}
            />
            <BoxRepositoriesArchived
                repositories={bv.loaded ? bv.resources.filter(r => !r.is_active) : null}
                archiveRepository={archiveRepository}
                destroyRepository={bv.destroyResource}
                running={bv.running}
            />
        </div>
    )
}
