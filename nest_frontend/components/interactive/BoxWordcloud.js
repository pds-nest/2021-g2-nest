import React from "react"
import BoxFull from "../base/BoxFull"
import ReactWordcloud from "@steffo/nest-react-wordcloud"
import Localization from "../../Localization"


/**
 * A Box which displays a wordcloud.
 *
 * @param words - A list of word objects, made of a string "text" and a number "value"
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxWordcloud({ words, props }) {
    return (
        <BoxFull header={Localization.wordcloud} {...props}>
            <div style={{"width": "100%", "height": "100%"}}>
                <ReactWordcloud
                    options={{
                        colors: [
                            "var(--fg-primary)",
                        ],
                        fontFamily: "Bree Serif",
                        fontSizes: [12, 128],
                        size: undefined,
                        deterministic: true,
                    }}
                    words={words}
                />
            </div>
        </BoxFull>
    )
}
