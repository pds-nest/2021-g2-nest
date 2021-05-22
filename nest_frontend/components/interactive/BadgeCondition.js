import React, { useContext } from "react"
import ContextRepositoryEditor from "../../contexts/ContextRepositoryEditor"
import Badge from "../base/Badge"


/**
 * A {@link Badge} representing a {@link Condition}.
 *
 * @param condition - The {@link Condition} that this badge represents.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BadgeCondition({ condition }) {
    const { removeRawCondition } = useContext(ContextRepositoryEditor)

    return (
        <Badge
            {...condition.display()}
            onClickDelete={() => removeRawCondition(condition)}
        />
    )
}
