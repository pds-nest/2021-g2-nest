import React, { useCallback, useContext } from "react"
import Style from "./PageRepositoriesList.module.css"
import classNames from "classnames"
import useBackendViewset from "../hooks/useBackendViewset"
import BoxRepositories from "../components/interactive/BoxRepositories"
import { useHistory } from "react-router"
import ContextLanguage from "../contexts/ContextLanguage"
import BoxHeader from "../components/base/BoxHeader"
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Button from "../components/base/Button"


export default function PageRepositoriesList({ children, className, ...props }) {
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
            <BoxHeader className={Style.Header}>
                <FontAwesomeIcon icon={faHome}/> {strings.dashboard}
            </BoxHeader>
            <div className={Style.Buttons}>
                <Button
                    icon={faPlus}
                    color={"Green"}
                    onClick={() => history.push("/repositories/create")}
                >
                    {strings.createRepo}
                </Button>
            </div>
            <BoxRepositories
                className={Style.ActiveRepositories}
                header={strings.menuActive}
                loading={!bv.firstLoad}
                running={bv.running}
                repositories={bv.resources.filter(r => r.is_active)}
                view={pk => history.push(`/repositories/${pk}`)}
                share={pk => history.push(`/repositories/${pk}/share`)}
                alerts={pk => history.push(`/repositories/${pk}/alerts`)}
                archive={archive}
                edit={pk => history.push(`/repositories/${pk}/edit`)}
            />
            <BoxRepositories
                className={Style.ArchivedRepositories}
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
