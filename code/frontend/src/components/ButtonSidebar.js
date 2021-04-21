import React from "react"
import Style from "./ButtonSidebar.module.css"
import classNames from "classnames"
import make_icon from "../utils/make_icon"
import { Link } from "react-router-dom"
import { useRouteMatch } from "react-router"


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
