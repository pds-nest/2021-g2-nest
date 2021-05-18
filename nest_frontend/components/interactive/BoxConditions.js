import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import ConditionBadge from "./ConditionBadge"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import ContextLanguage from "../../contexts/ContextLanguage"


/**
 * A box which renders all conditions of the {@link RepositoryEditor} as {@link ConditionBadge}s.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditions({ ...props }) {
    const { conditions } = useRepositoryEditor()
    const {strings} = useContext(ContextLanguage)

    const badges = conditions.map((cond, pos) => <ConditionBadge key={pos} {...cond}/>)

    return (
        <BoxFull header={strings.conditions} {...props}>
            {badges}
        </BoxFull>
    )
}
