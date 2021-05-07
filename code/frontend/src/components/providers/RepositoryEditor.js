import React, { useCallback, useState } from "react"
import ContextRepositoryEditor from "../../contexts/ContextRepositoryEditor"
import useArrayState from "../../hooks/useArrayState"


export default function RepositoryEditor({
    children,
    refresh,
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
        setValue: setRawConditions,
        appendValue: appendRawCondition,
        removeValue: removeRawCondition,
        spliceValue: spliceRawCondition,
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

            refresh()
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
            setRawConditions(conditions)
            setEvaluationMode(evaluationMode)
        },
        [name, isActive, start, end, conditions, evaluationMode]
    )

    /**
     * Try to add a new condition, logging a message to the console if something goes wrong.
     */
    const addCondition = useCallback(
        (newCond) => {
            // Check for content
            if(!newCond.content) {
                console.debug("Refusing to add ", newCond, ": content is empty.")
                return
            }

            // Check for duplicates
            let duplicate = null;
            for(const oldCond of _conditions) {
                if(newCond.type === oldCond.type && newCond.content === oldCond.content) {
                    duplicate = oldCond
                    break
                }
            }
            if(duplicate) {
                console.debug("Refusing to add ", newCond, ": ", duplicate, " already exists.")
                return
            }

            console.debug("Adding ", newCond, " to the Repository Conditions")
            appendRawCondition(newCond)
        },
        [_conditions]
    )

    return (
        <ContextRepositoryEditor.Provider value={{
            id,
            name: _name, setName,
            isActive: _isActive, setActive,
            start: _start, setStart,
            end: _end, setEnd,
            conditions: _conditions, addCondition, appendRawCondition, removeRawCondition, spliceRawCondition,
            evaluationMode: _evaluationMode, setEvaluationMode,
            revert, save,
        }}>
            {children}
        </ContextRepositoryEditor.Provider>
    )
}
