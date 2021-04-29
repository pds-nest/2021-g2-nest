import React from "react"
import Style from "./ButtonSmallX.module.css"
import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"


/**
 * A button with a small X, used to delete Conditions.
 *
 * @param className - Additional class(es) to pass to the button.
 * @param props - Additional props to pass to the button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonSmallX({ className, ...props }) {
    return (
        <button type={"button"} className={classNames(Style.ButtonSmallX, className)} {...props}>
            <FontAwesomeIcon icon={faTimes}/>
        </button>
    )
}
