import React from "react"
import Style from "./Button.module.css"
import classNames from "classnames"
import makeIcon from "../../utils/makeIcon"


/**
 * A clickable button.
 *
 * @param children - The contents of the button.
 * @param disabled - Whether the button is disabled or not.
 * @param onClick - Function to call when the button is clicked. Won't be called if the button is disabled.
 * @param className - Additional class(es) that should be added to the button.
 * @param color - The color of the button. Either `Red`, `Grey`, `Green` or `Yellow`.
 * @param icon - The FontAwesome IconDefinition of the icon that should be rendered in the button.
 * @param props - Additional props to pass to the button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button({ children, disabled, onClick, className, color, icon, ...props }) {
    return (
        <button
            type={"button"}
            className={classNames(Style.Button, Style[`Button${color}`], disabled ? null : "Clickable", className)}
            onClick={disabled ? null : onClick}
            disabled={disabled}
            {...props}
        >
            {children} {makeIcon(icon, {className: Style.Icon})}
        </button>
    )
}
