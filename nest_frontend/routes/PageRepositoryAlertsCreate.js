import React, { useContext } from "react"
import ContextLanguage from "../contexts/ContextLanguage"
import BoxHeader from "../components/base/BoxHeader"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import makeIcon from "../utils/makeIcon"
import AlertEditor from "../components/providers/AlertEditor"


export default function PageRepositoryAlertsCreate() {
    const { strings } = useContext(ContextLanguage)

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {makeIcon(faPlus)} {strings.alertCreate}
                </BoxHeader>
            }
        >
            <AlertEditor/>
        </PageWithHeader>
    )
}
