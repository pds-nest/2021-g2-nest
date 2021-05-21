import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import ContextLanguage from "../../contexts/ContextLanguage"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"
import BadgeFilter from "./BadgeFilter"


/**
 * A box which renders all filters of the {@link ContextRepositoryViewer} as {@link BadgeFilter}s.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFilters({ ...props }) {
    const { strings } = useContext(ContextLanguage)
    const { filters } = useContext(ContextRepositoryViewer)

    const badges = filters.map((filter, pos) => <BadgeFilter key={pos} filter={filter}/>)

    // TODO: localize this
    return (
        <BoxFull header={"Filters"} {...props}>
            {badges}
        </BoxFull>
    )
}
