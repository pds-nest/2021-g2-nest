import React, { useContext } from "react"
import Style from "./Layout.module.css"
import classNames from "classnames"
import Sidebar from "../interactive/Sidebar"
import ContextTheme from "../../contexts/ContextTheme"


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
    const { theme } = useContext(ContextTheme)

    return (
        <div className={classNames(theme, Style.Layout, className)} {...props}>
            <Sidebar className={Style.LayoutSidebar}/>
            <main className={Style.LayoutContent}>
                {children}
            </main>
        </div>
    )
}
