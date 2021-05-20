import React from "react"
import BoxFull from "../base/BoxFull"


export default function BoxVisualizationGraph({ children, className, ...props }) {
    // TODO: translate this
    // TODO: implement this

    return (
        <BoxFull header={"Hourly graph"} {...props}>
            {children}
        </BoxFull>
    )
}
