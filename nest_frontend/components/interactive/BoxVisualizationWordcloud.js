import React, { useContext } from "react"
import BoxWordcloud from "../base/BoxWordcloud"
import ContextLanguage from "../../contexts/ContextLanguage"


export default function BoxVisualizationWordcloud({ words, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <BoxWordcloud header={strings.wordcloud} words={words} {...props}/>
    )
}
