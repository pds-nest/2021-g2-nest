import React, { useMemo } from "react"
import BoxFull from "../base/BoxFull"
import ReactWordcloud from "@steffo/nest-react-wordcloud"
import Style from "./BoxWordcloud.module.css"


/**
 * A {@link BoxFull} which displays a wordcloud.
 *
 * @param words - A list of word objects, made of a string "text" and a number "value"
 * @param options - Additional options to pass to {@link ReactWordcloud}.
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxWordcloud({ words, callbacks = {}, ...props }) {
    const wordcloud = useMemo(
        () => (
            <ReactWordcloud
                options={{
                    colors: [
                        "var(--fg-primary)",
                    ],
                    fontFamily: "Bree Serif",
                    fontSizes: [8, 64],
                    size: undefined,
                    deterministic: true,
                    rotations: 0,
                    rotationAngles: [0, 0],
                    enableOptimizations: true,
                    enableTooltip: false,
                }}
                words={words}
                callbacks={callbacks}
            />
        ),
        [words],
    )

    return (
        <BoxFull {...props}>
            <div className={Style.WordcloudContainer}>
                {wordcloud}
            </div>
        </BoxFull>
    )
}
