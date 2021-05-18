import React from "react"
import Style from "./Badge.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ButtonSmallX from "./ButtonSmallX"


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
