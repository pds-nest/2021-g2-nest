import React from "react"
import Style from "./TextArea.module.css"
import classNames from "classnames"


/**
 * A multiline text field which can optionally be resized.
 *
 * @param resize - `true` if the resizing the textarea should be allowed, `false` otherwise.
 * @param children - The value of the `<textarea>`.
 * @param className - Additional class(es) to add to the textarea.
 * @param props - Additional props to pass to the textarea.
 * @returns {JSX.Element}
 * @constructor
 */
export default function TextArea({ resize, children, className, ...props }) {
    return (
        <textarea
            className={classNames(Style.TextArea, resize
                                                  ? Style.TextAreaResizable
                                                  : Style.TextAreaNoResize, className)} {...props}>
            {children}
        </textarea>
    )
}
