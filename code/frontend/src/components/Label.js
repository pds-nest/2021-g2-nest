import React, { Fragment } from "react"
import Style from "./Label.module.css"


/**
 * A row of a {@link LabelledForm}.
 * It displays a label on the first column and a container for the labelled element on the second column.
 *
 * @param children - The labelled element.
 * @param text - Text to be displayed in the label.
 * @param htmlFor - The `[id]` of the labelled element.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Label({ children, text, htmlFor }) {
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
