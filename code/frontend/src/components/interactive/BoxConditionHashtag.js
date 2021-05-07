import React, { useState } from "react"
import BoxFull from "../base/BoxFull"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHashtag, faPlus } from "@fortawesome/free-solid-svg-icons"
import InputWithIcon from "../base/InputWithIcon"
import FormInline from "../base/FormInline"
import Style from "./BoxConditionHashtag.module.css"
import ButtonIconOnly from "../base/ButtonIconOnly"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import Condition from "../../utils/Condition"

// Official hashtag regex from https://stackoverflow.com/a/22490853/4334568
// noinspection RegExpAnonymousGroup,LongLine
const INVALID_HASHTAG_CHARACTERS = /([^a-z0-9_\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u024f\u0253-\u0254\u0256-\u0257\u0300-\u036f\u1e00-\u1eff\u0400-\u04ff\u0500-\u0527\u2de0-\u2dff\ua640-\ua69f\u0591-\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05d0-\u05ea\u05f0-\u05f4\ufb12-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4f\u0610-\u061a\u0620-\u065f\u066e-\u06d3\u06d5-\u06dc\u06de-\u06e8\u06ea-\u06ef\u06fa-\u06fc\u0750-\u077f\u08a2-\u08ac\u08e4-\u08fe\ufb50-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\u200c\u0e01-\u0e3a\u0e40-\u0e4e\u1100-\u11ff\u3130-\u3185\ua960-\ua97f\uac00-\ud7af\ud7b0-\ud7ff\uffa1-\uffdc\u30a1-\u30fa\u30fc-\u30fe\uff66-\uff9f\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\u3041-\u3096\u3099-\u309e\u3400-\u4dbf\u4e00-\u9fff\u20000-\u2a6df\u2a700-\u2b73\u2b740-\u2b81\u2f800-\u2fa1])/g


/**
 * A {@link BoxFull} that allows the user to select a Twitter hashtag to search for, and then to add it as a Condition
 * to the {@link ContextRepositoryEditor}.
 *
 * @param props - Additional props to pass to the box.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditionHashtag({ ...props }) {
    const [hashtag, setHashtag] = useState("")
    const {addCondition} = useRepositoryEditor()

    const onInputChange = event => {
        let text = event.target.value
        text = text.replace(INVALID_HASHTAG_CHARACTERS, "")
        return setHashtag(text)
    }

    const onButtonClick = e => {
        addCondition(new Condition("HASHTAG", hashtag))
        setHashtag("")

        // Prevent reloading the page!
        e.preventDefault()
    }

    return (
        <BoxFull header={<span>Search by <FontAwesomeIcon icon={faHashtag}/> hashtag</span>} {...props}>
            <FormInline onSubmit={onButtonClick}>
                <InputWithIcon
                    className={Style.Input}
                    id={"condition-hashtag"}
                    icon={faHashtag}
                    value={hashtag}
                    onChange={onInputChange}
                    placeholder={"hashtag"}
                />
                <ButtonIconOnly
                    className={Style.Button}
                    icon={faPlus}
                    color={"Green"}
                    onClick={onButtonClick}
                />
            </FormInline>
        </BoxFull>
    )
}
