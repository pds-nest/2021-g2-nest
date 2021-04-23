import React from "react"
import Style from "./Layout.module.css"
import classNames from "classnames"
import Sidebar from "./Sidebar"


/**
 * The base page layout, consisting of a {@link Sidebar} on the left and the page contents on the remaining space.
 *
 * @param children - The page contents.
 * @param className - Additional class(es) to be added to the grid container.
 * @param props - Additional props to be passed to the grid container.
 * @returns {JSX.Element}
 * @constructor
 */
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
