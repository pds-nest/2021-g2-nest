import React from "react"
import Style from "./BodyHorizontalUpperGrow.module.css"
import classNames from "classnames"


export default function BodyHorizontalUpperGrow({ upper, lower, error, className, ...props }) {
    return (
        <div className={classNames(Style.BodyHorizontalUpperGrow, className)} {...props}>
            <div className={Style.Upper}>
                {upper}
            </div>
            <div className={Style.Lower}>
                {lower}
            </div>
            <div className={Style.Error}>
                {error}
            </div>
        </div>
    )
}
