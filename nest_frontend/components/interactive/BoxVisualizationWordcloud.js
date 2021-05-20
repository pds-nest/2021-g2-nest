import React, { useContext } from "react"
import BoxWordcloud from "../base/BoxWordcloud"
import ContextLanguage from "../../contexts/ContextLanguage"
import BoxFull from "../base/BoxFull"
import Empty from "./Empty"


export default function BoxVisualizationWordcloud({ words, ...props }) {
    const { strings } = useContext(ContextLanguage)

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
