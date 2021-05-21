import React from "react"
import ButtonIconOnly from "../base/ButtonIconOnly"


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
