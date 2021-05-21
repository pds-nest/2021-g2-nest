import React, { useContext } from "react"
import Style from "./ButtonToggleBeforeAfter.module.css"
import classNames from "classnames"
import Button from "../base/Button"
import ContextLanguage from "../../contexts/ContextLanguage"


export default function ButtonToggleBeforeAfter({ isBefore, setBefore, className, ...props }) {
    const { strings } = useContext(ContextLanguage)

    const onButtonClick = () => {
        setBefore(a => !a)
    }

    return (
        <Button
            color={"Grey"}
            className={classNames(Style.ButtonToggleBeforeAfter, className)}
            onClick={onButtonClick}
            {...props}
        >
            {isBefore ? strings.timeBefore : strings.timeAfter}
        </Button>
    )
}
