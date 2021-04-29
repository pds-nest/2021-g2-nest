import React, { useState } from "react"
import ContextRepositoryEditor from "../../contexts/ContextRepositoryEditor"
import useArrayState from "../../hooks/useArrayState"


export default function RepositoryEditor({ children, id, name, start, end, conditions }) {
    const [_name, setName] = useState(name)
    const [_start, setStart] = useState(start)
    const [_end, setEnd] = useState(end)
    const {
        value: _conditions,
        appendValue: appendCondition,
        removeValue: removeCondition,
        spliceValue: spliceCondition,
    } = useArrayState(conditions)

    return (
        <ContextRepositoryEditor.Provider value={{
            id,
            name: _name,
            setName,
            start: _start,
            setStart,
            end: _end,
            setEnd,
            conditions: _conditions,
            appendCondition,
            removeCondition,
            spliceCondition,
        }}>
            {children}
        </ContextRepositoryEditor.Provider>
    )
}
