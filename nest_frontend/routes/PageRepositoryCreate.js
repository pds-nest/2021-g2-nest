import React, { useContext } from "react"
import BoxHeader from "../components/base/BoxHeader"
import RepositoryEditor from "../components/providers/RepositoryEditor"
import ContextLanguage from "../contexts/ContextLanguage"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import makeIcon from "../utils/makeIcon"
import { faPlus } from "@fortawesome/free-solid-svg-icons"


export default function PageRepositoryCreate() {
    const { strings } = useContext(ContextLanguage)

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {makeIcon(faPlus)} {strings.dashboardTitle}
                </BoxHeader>
            }
            {...props}
        >
            <RepositoryEditor/>
        </PageWithHeader>
    )
}
