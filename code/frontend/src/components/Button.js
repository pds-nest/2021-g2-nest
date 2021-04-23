import React  from "react"
import Style from "./Button.module.css"
import classNames from "classnames"
import make_icon from "../utils/make_icon"


/**
 * A clickable button.
 *
 * @param children - The contents of the button.
 * @param className - Additional class(es) that should be added to the button.
 * @param color - The color of the button. Either `Red`, `Grey`, `Green` or `Yellow`.
 * @param icon - The FontAwesome IconDefinition of the icon that should be rendered in the button.
 * @param props - Additional props to pass to the button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button({ children, className, color, icon, ...props }) {
    return (
        <button type={"button"} className={classNames(Style.Button, Style[`Button${color}`], className)} {...props}>
            {children} {make_icon(icon, Style.Icon)}
        </button>
    )
}
