import React, {useState} from "react"
import Style from "./InputWithIcon.module.css"
import classNames from "classnames"
import make_icon from "../../utils/make_icon"


/**
 * Like an {@link Input}, but with an icon on the left side.
 *
 * Has a state which stores whether the inner input element is focused or not to change the style of the whole element
 * on focus.
 *
 * @param icon - The FontAwesome IconDefinition of the icon that should be rendered in the input.
 * @param className - Additional class(es) to be added to the outer container.
 * @param props - Additional props to be passed to the outer container.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InputWithIcon({ icon, className, ...props }) {
    const [isFocused, setFocused] = useState(false);

    return (
        <div className={classNames(Style.InputWithIcon, isFocused ? Style.Focused : null, className)}>
            <div className={Style.IconPart}>
                {make_icon(icon)}
            </div>
            <input
                className={Style.InputPart}
                onFocus={
                    event => {
                        setFocused(true)
                        if(props.onFocus) {
                            props.onFocus(event)
                        }
                    }
                }
                onBlur={
                    event => {
                        setFocused(false)
                        if(props.onBlur) {
                            props.onBlur(event)
                        }
                    }
                }
                {...props}
            />
        </div>
    )
}
