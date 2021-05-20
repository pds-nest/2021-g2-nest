import React, { useContext } from "react"
import Style from "./Empty.module.css"
import classNames from "classnames"
import ContextLanguage from "../../contexts/ContextLanguage"


export default function Empty({ children, className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <i className={classNames(Style.Empty, className)} {...props}>
            {strings.emptyMenu}
        </i>
    )
}
