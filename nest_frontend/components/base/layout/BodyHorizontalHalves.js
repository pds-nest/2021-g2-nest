import React from "react"
import Style from "./BodyHorizontalHalves.module.css"
import classNames from "classnames"


export default function BodyHorizontalHalves({ upper, lower, className, ...props }) {
    return (
        <div className={classNames(Style.BodyHorizontalHalves, className)} {...props}>
            <div className={Style.Upper}>
                {upper}
            </div>
            <div className={Style.Lower}>
                {lower}
            </div>
        </div>
    )
}
