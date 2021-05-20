import React, { useContext, useMemo } from "react"
import BoxWordcloud from "../base/BoxWordcloud"
import ContextLanguage from "../../contexts/ContextLanguage"
import tokenizeTweetWords from "../../utils/tokenizeTweetWords"


export default function BoxVisualizationWordcloud({ tweets = [], ...props }) {
    const {strings} = useContext(ContextLanguage)

    const words = useMemo(
        () => tokenizeTweetWords(tweets),
        [tweets]
    )

    return (
        <BoxWordcloud header={strings.wordcloud} words={words} {...props}/>
    )
}
