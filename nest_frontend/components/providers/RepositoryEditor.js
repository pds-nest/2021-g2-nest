import React, { useCallback, useContext, useMemo, useState } from "react"
import ContextRepositoryEditor from "../../contexts/ContextRepositoryEditor"
import useArrayState from "../../hooks/useArrayState"
import Style from "./RepositoryEditor.module.css"
import BoxConditionMap from "../interactive/BoxConditionMap"
import BoxConditionHashtag from "../interactive/BoxConditionHashtag"
import BoxConditionUser from "../interactive/BoxConditionUser"
import BoxConditionDatetime from "../interactive/BoxConditionDatetime"
import BoxConditions from "../interactive/BoxConditions"
import BoxRepositoryCreate from "../interactive/BoxRepositoryCreate"
import classNames from "classnames"
import ContextUser from "../../contexts/ContextUser"
import useBackend from "../../hooks/useBackend"


export default function RepositoryEditor({
                                             id = null,
                                             name,
                                             is_active: isActive,
                                             start,
                                             end,
                                             conditions,
                                             evaluation_mode: evaluationMode,
                                             className,
                                         }) {
    /** The repository name. */
    const [_name, setName] = useState(name ?? "")

    /** The repository state (active / archived). */
    const [_isActive, setActive] = useState(isActive ?? true)

    /** The start date of the data gathering. */
    const [_start, setStart] = useState(start ?? new Date().toISOString())

    /** The end date of the data gathering. */
    const [_end, setEnd] = useState(end ?? new Date().toISOString())

    /** The conditions of the data gathering. */
    const {
        value: _conditions,
        setValue: setRawConditions,
        appendValue: appendRawCondition,
        removeValue: removeRawCondition,
        spliceValue: spliceRawCondition,
    } = useArrayState(conditions)

    /** The operator the conditions should be evaluated with. */
    const [_evaluationMode, setEvaluationMode] = useState(evaluationMode ?? 0)

    const { user, fetchDataAuth } = useContext(ContextUser)

    const method = id ? "PUT" : "POST"
    const path = id ? `/api/v1/repositories/${id}` : `/api/v1/repositories/`
    const body = useMemo(
        () => {
            return {
                "conditions": _conditions,
                "end": null,
                "evaluation_mode": _evaluationMode,
                "id": id,
                "is_active": true,
                "name": _name,
                "owner": user,
                "start": null,
            }
        },
        [_conditions, _evaluationMode, id, _name, user],
    )
    const { error, loading, fetchNow } = useBackend(fetchDataAuth, method, path, body)

    const save = useCallback(
        async () => {
            if(!id) {
                console.info("Creating new repository with body: ", body)
            }
            else {
                console.info("Editing repository ", id, " with body: ", body)
            }
            await fetchNow()
        },
        [id, body, fetchNow],
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
        [name, isActive, start, end, conditions, evaluationMode, setRawConditions],
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
            let duplicate = null
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
        [_conditions, appendRawCondition],
    )

    return (
        <ContextRepositoryEditor.Provider
            value={{
                id,
                name: _name, setName,
                isActive: _isActive, setActive,
                start: _start, setStart,
                end: _end, setEnd,
                conditions: _conditions, addCondition, appendRawCondition, removeRawCondition, spliceRawCondition,
                evaluationMode: _evaluationMode, setEvaluationMode,
                error, loading,
                revert, save,
            }}
        >
            <div className={classNames(Style.RepositoryEditor, className)}>
                <BoxConditionMap className={Style.SearchByZone}/>
                <BoxConditionHashtag className={Style.SearchByHashtags}/>
                <BoxConditionUser className={Style.SearchByUser}/>
                <BoxConditionDatetime className={Style.SearchByTimePeriod}/>
                <BoxConditions className={Style.Conditions}/>
                <BoxRepositoryCreate className={Style.CreateDialog}/>
            </div>
        </ContextRepositoryEditor.Provider>
    )
}
