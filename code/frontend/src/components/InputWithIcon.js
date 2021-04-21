import React, {useState} from "react"
import Style from "./InputWithIcon.module.css"
import classNames from "classnames"
import make_icon from "../utils/make_icon"


export default function InputWithIcon({ icon, className, style, onFocus, onBlur, ...props }) {
    const [isFocused, setFocused] = useState(false);

    return (
        <div className={classNames(Style.InputWithIcon, isFocused ? Style.Focused : null, className)} style={style}>
            <div className={classNames(Style.IconPart)}>
                {make_icon(icon)}
            </div>
            <input
                className={classNames(Style.InputPart)}
                onFocus={
                    event => {
                        setFocused(true)
                        if(onFocus) {
                            onFocus(event)
                        }
                    }
                }
                onBlur={
                    event => {
                        setFocused(false)
                        if(onBlur) {
                            onBlur(event)
                        }
                    }
                }
                {...props}
            />
        </div>
    )
}
