import React, { useContext } from "react"
import BoxFull from "../base/BoxFull"
import ContextRepositoryViewer from "../../contexts/ContextRepositoryViewer"
import BadgeFilter from "./BadgeFilter"
import useStrings from "../../hooks/useStrings"


/**
 * A box which renders all filters of the {@link ContextRepositoryViewer} as {@link BadgeFilter}s.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxFilters({ ...props }) {
    const strings = useStrings()
    const { filters } = useContext(ContextRepositoryViewer)

    const badges = filters.map((filter, pos) => <BadgeFilter key={pos} filter={filter}/>)

    return (
        <BoxFull header={strings.filters} {...props}>
            {badges}
        </BoxFull>
    )
}
