import React, { Fragment } from "react"
import Style from "./Label.module.css"
import classNames from "classnames"


export default function Label({ children, text, for_ }) {
    return (
        <Fragment>
            <label for={for_} className={Style.LabelText} >
                {text}
            </label>
            <div className={Style.LabelContent}>
                {children}
            </div>
        </Fragment>
    )
}
