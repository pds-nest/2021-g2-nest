import React from "react"
import BoxFull from "../base/BoxFull"
import FormInline from "../base/FormInline"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow, faPlus } from "@fortawesome/free-solid-svg-icons"
import { HasPlaceFilter } from "../../utils/Filter"
import ButtonIconOnly from "../base/ButtonIconOnly"


export default function BoxFilterHasPlace({ ...props }) {
    const strings = useStrings()

    const { appendFilter } = useRepositoryViewer()

    const submit = () => {
        appendFilter(new HasPlaceFilter(false))
    }

    // TODO: translate this

    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faLocationArrow}/>
                    &nbsp;
                    {strings.byHasPlace}
                </span>
            }
            {...props}
        >
            <FormInline>
                <div style={{"flex-grow": 1}}>
                    {strings.hasPlaceExplaination}
                </div>
                <ButtonIconOnly
                    icon={faPlus}
                    color={"Green"}
                    onClick={submit}
                />
            </FormInline>
        </BoxFull>
    )
}
