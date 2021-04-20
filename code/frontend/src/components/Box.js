import React from "react"
import Style from "./Box.module.css"
import classNames from "classnames"


export default function Box({ children, className, ...props }) {
    return (
        <div
            className={classNames(Style.Box, className)}
            {...props}
        >
            {children}
        </div>
    )
}
