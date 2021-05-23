import React, { useContext } from "react"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"
import Badge from "../base/Badge"


/**
 * A {@link Badge} representing a Filter.
 *
 * @param filter - The Filter that this badge represents.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BadgeFilter({ filter }) {
    const { removeFilter } = useContext(ContextRepositoryViewer)

    return (
        <Badge
            {...filter.display()}
            onClickDelete={() => removeFilter(filter)}
        />
    )
}
