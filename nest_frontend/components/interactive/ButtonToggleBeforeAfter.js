import React, { useState } from "react"
import Style from "./ButtonToggleBeforeAfter.module.css"
import classNames from "classnames"
import Button from "../base/Button"
import Localization from "../../Localization"


export default function ButtonToggleBeforeAfter({ onUpdate, className, ...props }) {
    const [value, setValue] = useState(false)

    const onButtonClick = () => {
        onUpdate(!value)
        setValue(value => !value)
    }

    return (
        <Button
            color={"Grey"}
            className={classNames(Style.ButtonToggleBeforeAfter, className)}
            onClick={onButtonClick}
            {...props}
        >
            {value ? Localization.timeBefore : Localization.timeAfter}
        </Button>
    )
}
