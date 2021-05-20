import React, { useRef } from "react"
import BoxFull from "./BoxFull"
import ChartComponent from "react-chartjs-2"


export default function BoxChart({chartProps, ...props}) {
    const boxContentsRef = useRef(null)
    const getCssVar = (variable) => {
        const computedStyle = window.getComputedStyle(boxContentsRef.current)
        console.debug(variable, computedStyle.getPropertyValue(variable))
        return computedStyle.getPropertyValue(variable).trim()
    }

    return (
        <BoxFull
            childrenProps={{ref: boxContentsRef}}
            {...props}
        >
            {boxContentsRef.current ?
                <ChartComponent
                    width={boxContentsRef.current.offsetWidth}
                    height={boxContentsRef.current.offsetHeight}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                beginAtZero: true,
                                grid: {
                                    borderColor: getCssVar("--bg-light"),
                                    color: getCssVar("--bg-light"),
                                },
                                ticks: {
                                    color: getCssVar("--fg-primary"),
                                }
                            },
                            y: {
                                beginAtZero: true,
                                grid: {
                                    borderColor: getCssVar("--bg-light"),
                                    color: getCssVar("--bg-light"),
                                },
                                ticks: {
                                    color: getCssVar("--fg-primary"),
                                }
                            },
                        },
                        elements: {
                            bar: {
                                backgroundColor: getCssVar("--fg-primary"),
                                borderColor: "transparent",
                                color: getCssVar("--fg-primary"),
                            },
                        },
                    }}
                    {...chartProps}
                />
             : null}
        </BoxFull>
    )
}
