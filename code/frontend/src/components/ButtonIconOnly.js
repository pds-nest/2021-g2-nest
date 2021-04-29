import React from "react"
import Style from "./ButtonIconOnly.module.css"
import classNames from "classnames"
import Button from "./Button"


export default function ButtonIconOnly({ children, className, ...props }) {
    return (
        <Button className={classNames(Style.ButtonIconOnly, className)} {...props}/>
    )
}
