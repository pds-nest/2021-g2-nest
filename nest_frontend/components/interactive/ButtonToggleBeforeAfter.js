import React from "react"
import Style from "./ButtonToggleBeforeAfter.module.css"
import classNames from "classnames"
import Button from "../base/Button"
import useStrings from "../../hooks/useStrings"


/**
 * A {@link Button} allowing the user to select between **Before** and **After**.
 *
 * @param isBefore - The current value of the button.
 * @param setBefore - Function to set the current value of the button.
 * @param className - Additional class(es) to append to the button.
 * @param props - Additional props to pass to the button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonToggleBeforeAfter({ isBefore, setBefore, className, ...props }) {
    const strings = useStrings()

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
