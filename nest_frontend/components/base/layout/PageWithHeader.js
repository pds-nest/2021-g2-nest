import React from "react"
import Style from "./PageWithHeader.module.css"
import classNames from "classnames"


export default function PageWithHeader({ header, buttons, children, className, ...props }) {
    return (
        <div className={classNames(Style.PageWithHeader, className)} {...props}>
            <div className={Style.Header}>
                {header}
            </div>
            {buttons ?
                <div className={Style.Buttons}>
                   {buttons}
                </div>
            : null}
            <div className={Style.Body}>
                {children}
            </div>
        </div>
    )
}
