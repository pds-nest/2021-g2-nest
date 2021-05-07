import React, { useCallback, useState } from "react"
import ContextRepositoryEditor from "../../contexts/ContextRepositoryEditor"
import useArrayState from "../../hooks/useArrayState"


export default function RepositoryEditor({
    children,
    id = null,
    name,
    is_active: isActive,
    start,
    end,
    conditions,
    evaluation_mode: evaluationMode,
}) {
    /** The repository name. */
    const [_name, setName] = useState(name)

    /** The repository state (active / archived). */
    const [_isActive, setActive] = useState(isActive)

    /** The start date of the data gathering. */
    const [_start, setStart] = useState(start)

    /** The end date of the data gathering. */
    const [_end, setEnd] = useState(end)

    /** The conditions of the data gathering. */
    const {
        value: _conditions,
        setValue: setConditions,
        appendValue: appendCondition,
        removeValue: removeCondition,
        spliceValue: spliceCondition,
    } = useArrayState(conditions)

    /** The operator the conditions should be evaluated with. */
    const [_evaluationMode, setEvaluationMode] = useState(evaluationMode)

    /**
     * Invia al backend le modifiche effettuate.
     */
    const save = useCallback(
        () => {
            if(id === null) {
                // POST
                throw new Error("Not yet implemented")
            }
            else {
                // PUT
                throw new Error("Not yet implemented")
            }
        },
        [id]
    )

    /**
     * Cancel the changes made so far to the repository.
     */
    const revert = useCallback(
        () => {
            setName(name)
            setActive(isActive)
            setStart(start)
            setEnd(end)
            setConditions(conditions)
            setEvaluationMode(evaluationMode)
        },
        [name, isActive, start, end, conditions, evaluationMode]
    )

    return (
        <ContextRepositoryEditor.Provider value={{
            id,
            name: _name, setName,
            isActive: _isActive, setActive,
            start: _start, setStart,
            end: _end, setEnd,
            conditions: _conditions, appendCondition, removeCondition, spliceCondition,
            evaluationMode: _evaluationMode, setEvaluationMode,
            revert, save,
        }}>
            {children}
        </ContextRepositoryEditor.Provider>
    )
}
