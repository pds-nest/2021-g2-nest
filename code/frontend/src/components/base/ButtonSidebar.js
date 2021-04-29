import React from "react"
import Style from "./ButtonSidebar.module.css"
import classNames from "classnames"
import make_icon from "../../utils/make_icon"
import { Link } from "react-router-dom"
import { useRouteMatch } from "react-router"


/**
 * A button residing in the {@link Sidebar}, used to switch between pages.
 *
 * @param icon - The FontAwesome IconDefinition of the icon that should be rendered in the button.
 * @param children - The contents of the button.
 * @param to - The path of the page the user should be redirected to when clicking on the button.
 * @param className - Additional class(es) to add to the button.
 * @param props - Additional props to pass to the button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonSidebar({ icon, children, to, className, ...props }) {
    const match = useRouteMatch({
        path: to,
        strict: true,
        exact: true,
    });

    if(match) {
        className = classNames(Style.Active, className)
    }

    return (
        <Link to={to} className={Style.ButtonLink}>
            <div className={classNames(Style.ButtonSidebar, className)} {...props}>
                {make_icon(icon, Style.ButtonIcon)}
                <div className={Style.ButtonText}>
                    {children}
                </div>
            </div>
        </Link>
    )
}
