import React from "react"
import Style from "./LabelledForm.module.css"
import classNames from "classnames"


export default function LabelledForm({ children, className, ...props }) {
    return (
        <form className={classNames(Style.LabelledForm, className)} {...props}>
            {children}
        </form>
    )
}
