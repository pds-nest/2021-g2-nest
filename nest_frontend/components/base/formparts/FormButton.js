import React from "react"
import Style from "./FormButton.module.css"
import classNames from "classnames"
import Button from "../Button"


/**
 * A {@link Button} ready to be used in a {@link FormLabelled}.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormButton({ children, className, ...props }) {
    return (
        <Button className={classNames(Style.FormButton, className)} {...props}>
            {children}
        </Button>
    )
}
