import React from "react"
import ButtonIconOnly from "../base/ButtonIconOnly"


/**
 * A {@link ButtonIconOnly} to be used to switch between RepositoryViewer tabs.
 *
 * @param setTab - Function to change tab.
 * @param currentTab - Name of the current tab, as a string.
 * @param name - Name of the tab this button should switch to, as a string.
 * @param props - Additional props to pass to the button.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonPicker({ setTab, currentTab, name, ...props }) {
    return (
        <ButtonIconOnly
            onClick={() => setTab(name)}
            disabled={currentTab === name}
            color={"Grey"}
            {...props}
        />
    )
}
