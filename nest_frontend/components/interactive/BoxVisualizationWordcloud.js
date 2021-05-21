import React, { useContext } from "react"
import BoxWordcloud from "../base/BoxWordcloud"
import ContextLanguage from "../../contexts/ContextLanguage"
import BoxFull from "../base/BoxFull"
import Empty from "./Empty"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


export default function BoxVisualizationWordcloud({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const {words} = useContext(ContextRepositoryViewer)

    if(words.length === 0) {
        return (
            <BoxFull header={strings.wordcloud} {...props}>
                <Empty/>
            </BoxFull>
        )
    }

    return (
        <BoxWordcloud header={strings.wordcloud} words={words} {...props}/>
    )
}
