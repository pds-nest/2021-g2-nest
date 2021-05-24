import React from "react"
import BoxFull from "../base/BoxFull"
import BadgeCondition from "./BadgeCondition"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import useStrings from "../../hooks/useStrings"


/**
 * A box which renders all conditions of the {@link RepositoryEditor} as {@link BadgeCondition}s.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxConditions({ ...props }) {
    const { conditions } = useRepositoryEditor()
    const strings = useStrings()

    const badges = conditions.map((cond, pos) => <BadgeCondition key={pos} condition={cond}/>)

    return (
        <BoxFull header={strings.conditions} {...props}>
            {badges}
        </BoxFull>
    )
}
