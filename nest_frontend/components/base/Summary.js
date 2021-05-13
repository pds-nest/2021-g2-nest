import React from "react"
import Style from "./Summary.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


/**
 * A long line displaying the summary of a certain entity, such as a repository or an user.
 *
 * @param icon - The icon of the summary.
 * @param title - The title of the summary.
 * @param subtitle - The subtitle of the summary.
 * @param onClick - A function to call when the summary is clicked.
 * @param upperLabel - The label for the upper value.
 * @param upperValue - The upper value.
 * @param lowerLabel - The label for the lower value.
 * @param lowerValue - The lower value.
 * @param buttons - Buttons to add to the right of the summary.
 * @param className - Additional class(es) to add to the summary.
 * @param props - Additional props to pass to the summary.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Summary(
    { icon, title, subtitle, onClick, upperLabel, upperValue, lowerLabel, lowerValue, buttons, className, ...props },
) {
    return (
        <div className={classNames(Style.Summary, className)} {...props}>
            <div className={classNames(Style.Left, onClick ? Style.Clickable : null)} onClick={onClick}>
                <div className={Style.IconContainer}>
                    <FontAwesomeIcon icon={icon}/>
                </div>
                <div className={Style.Title}>
                    {title}
                </div>
                <div className={Style.Subtitle}>
                    {subtitle}
                </div>
            </div>
            <div className={Style.Middle}>
                <div className={classNames(Style.Label, Style.Upper)}>
                    {upperLabel}
                </div>
                <div className={classNames(Style.Value, Style.Upper)}>
                    {upperValue}
                </div>
                <div className={classNames(Style.Label, Style.Lower)}>
                    {lowerLabel}
                </div>
                <div className={classNames(Style.Value, Style.Lower)}>
                    {lowerValue}
                </div>
            </div>
            <div className={Style.Right}>
                {buttons}
            </div>
        </div>
    )
}
