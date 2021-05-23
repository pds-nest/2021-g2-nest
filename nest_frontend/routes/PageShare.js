import React, { useContext } from "react"
import classNames from "classnames"
import BoxHeader from "../components/base/BoxHeader"
import ContextLanguage from "../contexts/ContextLanguage"
import Style from "./PageShare.module.css"


export default function PageShare({ className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    return (
        <div className={classNames(Style.PageShare, className)} {...props}>
            <BoxHeader className={Style.Header}>
                {strings.repoShare}
            </BoxHeader>
        </div>
    )
}
