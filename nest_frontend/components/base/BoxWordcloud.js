import React from "react"
import BoxFull from "../base/BoxFull"
import ReactWordcloud from "@steffo/nest-react-wordcloud"
import Style from "./BoxWordcloud.module.css"


/**
 * A Box which displays a wordcloud.
 *
 * @param words - A list of word objects, made of a string "text" and a number "value"
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxWordcloud({ words, ...props }) {
    return (
        <BoxFull {...props}>
            <div className={Style.WordcloudContainer}>
                <ReactWordcloud
                    options={{
                        colors: [
                            "var(--fg-primary)",
                        ],
                        fontFamily: "Bree Serif",
                        fontSizes: [8, 64],
                        size: undefined,
                        deterministic: true,
                    }}
                    words={words}
                />
            </div>
        </BoxFull>
    )
}
