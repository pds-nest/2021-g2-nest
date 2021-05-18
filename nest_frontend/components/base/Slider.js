import React from "react"
import Style from "./Slider.module.css"
import classNames from "classnames"


/**
 * A slider that allows to select a numeric value in a range.
 *
 * Custom styling only works on Firefox!
 *
 * @param className - Additional class(es) to add to the element.
 * @param props - Additional props to pass to the element.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Slider({ className, ...props }) {
    return (
        <input
            type={"range"}
            className={classNames(Style.Slider, className)} {...props}
        />
    )
}
