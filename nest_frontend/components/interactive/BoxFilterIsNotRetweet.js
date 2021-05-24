import React from "react"
import BoxFull from "../base/BoxFull"
import FormInline from "../base/FormInline"
import useRepositoryViewer from "../../hooks/useRepositoryViewer"
import useStrings from "../../hooks/useStrings"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faRetweet } from "@fortawesome/free-solid-svg-icons"
import { FilterIsRetweet, FilterWithImage } from "../../objects/Filter"
import ButtonIconOnly from "../base/ButtonIconOnly"


/**
 * A {@link BoxFull} that allows the user to add a {@link FilterWithImage} to a RepositoryViewer.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFilterIsNotRetweet({ ...props }) {
    const strings = useStrings()

    const { appendFilter } = useRepositoryViewer()

    const submit = () => {
        appendFilter(new FilterIsRetweet(true))
    }

    // TODO: translate this

    return (
        <BoxFull
            header={
                <span>
                    {strings.searchBy}
                    &nbsp;
                    <FontAwesomeIcon icon={faRetweet}/>
                    &nbsp;
                    {strings.byRetweet}
                </span>
            }
            {...props}
        >
            <FormInline>
                <div style={{ "flexGrow": 1 }}>
                    {strings.isNotRetweetExplaination}
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
