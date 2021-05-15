import React from "react"
import BoxFull from "../base/BoxFull"
import ReactWordcloud from "react-wordcloud"


export default function BoxWordcloud({ ...props }) {
    return (
        <BoxFull header={"Wordcloud"} {...props}>
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
                    words={[
                        {
                            text: "noi",
                            value: 1
                        },
                        {
                            text: "estraiamo",
                            value: 1
                        },
                        {
                            text: "statistiche",
                            value: 1
                        },
                        {
                            text: "tweet",
                            value: 1
                        },
                    ]}
                />
            </div>
        </BoxFull>
    )
}
