import React, { Fragment } from "react"
import Style from "./FormLabel.module.css"


/**
 * A row of a {@link FormLabelled}.
 *
 * It displays a label on the first column and a container for the labelled element on the second column.
 *
 * @param children - The labelled element.
 * @param text - Text to be displayed in the label.
 * @param htmlFor - The `[id]` of the labelled element.
 * @returns {JSX.Element}
 * @constructor
 */
export default function FormLabel({ children, text, htmlFor }) {
    return (
        <Fragment>
            <label htmlFor={htmlFor} className={Style.LabelText} >
                {text}
            </label>
            <div className={Style.LabelContent}>
                {children}
            </div>
        </Fragment>
    )
}
