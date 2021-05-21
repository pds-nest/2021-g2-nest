import React from "react"
import { useParams } from "react-router"
import RepositoryViewer from "../components/providers/RepositoryViewer"


export default function PageRepository({ className, ...props }) {
    const { id } = useParams()

    return (
        <RepositoryViewer id={id} {...props}/>
    )
}
