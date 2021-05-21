import React, { useContext } from "react"
import { faAt, faClock, faGlobe, faHashtag, faMapPin } from "@fortawesome/free-solid-svg-icons"
import ContextRepositoryEditor from "../../contexts/ContextRepositoryEditor"
import Badge from "../base/Badge"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"


/**
 * A {@link Badge} representing a Filter.
 *
 * @param filter - The Filter that this badge represents.
 * @returns {JSX.Element}
 * @constructor
 */
export default function BadgeFilter({ filter }) {
    const {removeFilter} = useContext(ContextRepositoryViewer)

    return (
        <Badge
            color={filter.color()}
            icon={filter.icon()}
            onClickDelete={() => removeFilter(filter)}
        >
            {filter.text()}
        </Badge>
    )
}
