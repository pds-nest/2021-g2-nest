import React from "react"
import Style from "./Badge.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ButtonSmallX from "./ButtonSmallX"


/**
 * A small colored badge.
 *
 * @param icon - The icon that the badge should have on the left.
 * @param color - The color that the badge should have.
 * @param onClickDelete - The action to perform when the X button is clicked. If undefined, the X button won't be shown.
 * @param children - The text of the badge.
 * @param className - Additional class(es) to append to the badge.
 * @param props - Additional props to pass to the badge.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Badge({ icon, color, onClickDelete, children, className, ...props }) {
    return (
        <div className={classNames(Style.Badge, Style[`Badge${color}`], className)} {...props}>
            <div className={Style.Icon}>
                <FontAwesomeIcon icon={icon}/>
            </div>
            <div className={Style.Text}>
                {children}
            </div>
            {
                onClickDelete ?
                <div>
                    <ButtonSmallX
                        onClick={onClickDelete}
                    />
                </div>
                              : null
            }
        </div>
    )
}
