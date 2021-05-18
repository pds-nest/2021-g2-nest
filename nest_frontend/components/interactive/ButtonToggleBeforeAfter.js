import React, { useContext, useState } from "react"
import Style from "./ButtonToggleBeforeAfter.module.css"
import classNames from "classnames"
import Button from "../base/Button"
import ContextLanguage from "../../contexts/ContextLanguage"


export default function ButtonToggleBeforeAfter({ onUpdate, className, ...props }) {
    const [value, setValue] = useState(false)
    const {strings} = useContext(ContextLanguage)

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
            {value ? strings.timeBefore : strings.timeAfter}
        </Button>
    )
}
