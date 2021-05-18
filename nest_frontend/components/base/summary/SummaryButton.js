import React from "react"
import Style from "./SummaryButton.module.css"
import classNames from "classnames"
import Button from "../Button"


export default function SummaryButton({ className, ...props }) {
    return (
        <Button className={classNames(Style.SummaryButton, className)} {...props}/>
    )
}
