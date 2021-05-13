import React from "react"
import Style from "./ButtonIconOnly.module.css"
import classNames from "classnames"
import Button from "./Button"


/**
 * A {@link Button} with only an icon.
 *
 * @param className - Additional class(es) to add to the button.
 * @param props - Additional props to pass to the button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonIconOnly({ className, ...props }) {
    return (
        <Button className={classNames(Style.ButtonIconOnly, className)} {...props}/>
    )
}
