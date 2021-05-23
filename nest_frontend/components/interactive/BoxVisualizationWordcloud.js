import React, { useCallback, useContext } from "react"
import BoxWordcloud from "../base/BoxWordcloud"
import ContextLanguage from "../../contexts/ContextLanguage"
import BoxFull from "../base/BoxFull"
import Empty from "./Empty"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"
import { FilterContains } from "../../objects/Filter"


export default function BoxVisualizationWordcloud({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const { words, appendFilter } = useContext(ContextRepositoryViewer)

    if(words.length === 0) {
        return (
            <BoxFull header={strings.wordcloud} {...props}>
                <Empty/>
            </BoxFull>
        )
    }

    const onWordClick = useCallback(
        word => {
            appendFilter(new FilterContains(word.text))
        },
        [appendFilter],
    )

    return (
        <BoxWordcloud
            header={strings.wordcloud}
            words={words}
            callbacks={{ onWordClick }}
            {...props}
        />
    )
}
