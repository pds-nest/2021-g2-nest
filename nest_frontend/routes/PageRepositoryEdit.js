import React, { useContext } from "react"
import BoxHeader from "../components/base/BoxHeader"
import RepositoryEditor from "../components/providers/RepositoryEditor"
import useBackendImmediately from "../hooks/useBackendImmediately"
import ContextUser from "../contexts/ContextUser"
import renderContents from "../utils/renderContents"
import { useParams } from "react-router"
import ContextLanguage from "../contexts/ContextLanguage"
import PageWithHeader from "../components/base/layout/PageWithHeader"
import makeIcon from "../utils/makeIcon"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons"


export default function PageRepositoryEdit() {
    const { strings } = useContext(ContextLanguage)

    const { id } = useParams()
    const { fetchDataAuth } = useContext(ContextUser)
    const repositoryRequest = useBackendImmediately(fetchDataAuth, "GET", `/api/v1/repositories/${id}`)
    const contents = renderContents(
        repositoryRequest,
        data => <RepositoryEditor {...data}/>
    )

    return (
        <PageWithHeader
            header={
                <BoxHeader>
                    {makeIcon(faPencilAlt)} {strings.repoEdit}
                </BoxHeader>
            }
        >
            {contents}
        </PageWithHeader>
    )
}
