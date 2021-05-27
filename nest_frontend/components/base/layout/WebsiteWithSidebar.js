import React from "react"
import Style from "./WebsiteWithSidebar.module.css"
import classNames from "classnames"


/**
 * The base page layout, consisting of a {@link Sidebar} on the left and the page contents on the remaining space.
 *
 * @param sidebar - The sidebar to display.
 * @param children - The page contents.
 * @param className - Additional class(es) to be added to the grid container.
 * @param props - Additional props to be passed to the grid container.
 * @returns {JSX.Element}
 * @constructor
 */
export default function WebsiteWithSidebar({ sidebar, children, className, ...props }) {

    return (
        <div className={classNames(Style.WebsiteWithSidebar, className)} {...props}>
            <aside className={Style.Sidebar}>
                {sidebar}
            </aside>
            <main className={Style.Main}>
                {children}
            </main>
        </div>
    )
}
