import React from "react"
import Style from "./Layout.module.css"
import classNames from "classnames"
import Sidebar from "./Sidebar"


export default function Layout({ children, className, ...props }) {
    return (
        <div className={classNames(Style.Layout, className)} {...props}>
            <Sidebar className={Style.LayoutSidebar}/>
            <div className={Style.LayoutContent}>
                {children}
            </div>
        </div>
    )
}
