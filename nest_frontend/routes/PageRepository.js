import React from "react"
import Style from "./PageRepository.module.css"
import classNames from "classnames"
import BoxWordcloud from "../components/interactive/BoxWordcloud"


export default function PageRepository({ className, ...props }) {
    return (
        <div className={classNames(Style.PageRepository, className)} {...props}>
            <BoxWordcloud className={Style.Wordcloud}/>
        </div>
    )
}
