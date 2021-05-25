import React from "react"
import Style from "./ButtonHeader.module.css"
import classNames from "classnames"
import Button from "./Button"


/**
 * A {@link Button} without `boxShadow` and with `flexGrow`, to be used in {@link PageWithHeader}.
 *
 * @param className - Additional class(es) to add to the button.
 * @param props - Additional props to pass to the button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonHeader({ className, ...props }) {
    return (
        <Button className={classNames(Style.ButtonHeader, className)} {...props}/>
    )
}
