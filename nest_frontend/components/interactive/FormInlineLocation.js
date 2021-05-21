import React from "react"
import FormInline from "../base/FormInline"
import InputWithIcon from "../base/InputWithIcon"
import { faCircle, faPlus, faRulerHorizontal, faRulerVertical } from "@fortawesome/free-solid-svg-icons"
import ButtonIconOnly from "../base/ButtonIconOnly"
import Style from "./FormInlineLocation.module.css"


export default function FormInlineLocation(
    {
        mapViewHook,
        radIcon = faCircle,
        latIcon = faRulerHorizontal,
        lngIcon = faRulerVertical,
        buttonIcon = faPlus,
        buttonColor = "Green",
        placeholder = new Date().toISOString(),
        validate = value => value,
        submit,
        ...props
    },
) {

    const _onSubmit = event => {
        event.preventDefault()
        submit()
    }

    return (
        <FormInline onSubmit={_onSubmit} {...props}>
            <InputWithIcon
                className={Style.Radius}
                type={"text"}
                icon={radIcon}
                value={`${mapViewHook.radius} m`}
                disabled={true}
            />
            <InputWithIcon
                className={Style.Latitude}
                type={"text"}
                icon={latIcon}
                value={mapViewHook.center.lat.toFixed(3)}
                disabled={true}
            />
            <InputWithIcon
                className={Style.Longitude}
                type={"text"}
                icon={lngIcon}
                value={mapViewHook.center.lng.toFixed(3)}
                disabled={true}
            />
            <ButtonIconOnly
                className={Style.Button}
                icon={buttonIcon}
                color={buttonColor}
                onClick={_onSubmit}
            />
        </FormInline>
    )
}
