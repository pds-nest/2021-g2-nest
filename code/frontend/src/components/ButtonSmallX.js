import React from "react"
import Style from "./ButtonSmallX.module.css"
import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"


export default function ButtonSmallX({ children, className, ...props }) {
    return (
        <button type={"button"} className={classNames(Style.ButtonSmallX, className)} {...props}>
            <FontAwesomeIcon icon={faTimes}/>
        </button>
    )
}
