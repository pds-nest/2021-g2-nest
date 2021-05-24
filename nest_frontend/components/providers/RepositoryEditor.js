import React, { useCallback, useContext, useState } from "react"
import ContextRepositoryEditor from "../../contexts/ContextRepositoryEditor"
import useArrayState from "../../hooks/useArrayState"
import Style from "./RepositoryEditor.module.css"
import BoxConditionLocation from "../interactive/BoxConditionLocation"
import BoxConditionHashtag from "../interactive/BoxConditionHashtag"
import BoxConditionUser from "../interactive/BoxConditionUser"
import BoxConditionDatetime from "../interactive/BoxConditionDatetime"
import BoxConditions from "../interactive/BoxConditions"
import BoxRepositoryCreate from "../interactive/BoxRepositoryCreate"
import classNames from "classnames"
import ContextUser from "../../contexts/ContextUser"
import { Condition } from "../../objects/Condition"
import useBackendViewset from "../../hooks/useBackendViewset"
import { Redirect } from "react-router"


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
    /** The currently logged in user. */
    const { user } = useContext(ContextUser)

    /** The repository name. */
    const [_name, setName] = useState(name ?? "")

    /** The conditions of the data gathering. */
    const {
        value: rawConditions,
        setValue: setRawConditions,
        appendValue: appendRawCondition,
        removeValue: removeRawCondition,
        spliceValue: spliceRawCondition,
    } = useArrayState(conditions)
    const _conditions = rawConditions.map(cond => Condition.fromRaw(cond))

    /** The operator the conditions should be evaluated with. */
    const [_evaluationMode, setEvaluationMode] = useState(evaluationMode ?? 0)

    /** The backend viewset to use to create / edit the repository. */
    const {running, error, createResource, editResource} = useBackendViewset(
        `/api/v1/repositories/`,
        "id",
        {
            list: false,
            create: true,
            retrieve: false,
            edit: true,
            destroy: false,
            command: false,
            action: false,
        }
    )

    /** If `true`, switches to the repository page on the next render. */
    const [switchPage, setSwitchPage] = useState(false)

    /**
     * Save the current changes, creating or editing it as needed.
     *
     * @type {(function(): Promise<void>)|*}
     */
    const save = useCallback(
        async () => {
            const body = {
                "id": id,
                "name": _name,
                "start": null,
                "is_active": true,
                "end": null,
                "owner": user,
                "spectators": null,
                "evaluation_mode": _evaluationMode,
                "conditions": _conditions,
            }

            if(!id) {
                console.info("Creating new repository with body: ", body)
                await createResource(body)
            }
            else {
                console.info("Editing repository ", id, " with body: ", body)
                await editResource(id, body)
            }
            setSwitchPage(true)
        },
        [id, createResource, editResource, _conditions, _evaluationMode, _name, user],
    )


    /**
     * Cancel the changes made so far to the repository.
     *
     * @type {(function(): void)|*}
     */
    const revert = useCallback(
        () => {
            setName(name)
            setRawConditions(conditions)
            setEvaluationMode(evaluationMode)
        },
        [name, isActive, start, end, conditions, evaluationMode, setRawConditions],
    )

    /**
     * Try to add a new condition, logging a message to the console if something goes wrong.
     *
     * @type {(function(): void)|*}
     */
    const addCondition = useCallback(
        (newCond) => {

            // Check for duplicates
            let duplicate = null
            for(const oldCond of _conditions) {
                if(newCond.type === oldCond.type && newCond.content === oldCond.content) {
                    duplicate = oldCond
                    break
                }
            }
            if(duplicate) {
                console.debug("Cannot add ", newCond, ": ", duplicate, " already exists.")
                return
            }

            console.debug("Adding ", newCond, " to the repository conditions")
            appendRawCondition(newCond)
        },
        [_conditions, appendRawCondition],
    )

    // Hack to switch page on success
    if(!error && switchPage) {
        return <Redirect to={"/repositories"}/>
    }

    return (
        <ContextRepositoryEditor.Provider
            value={{
                id,
                name: _name, setName,
                conditions: _conditions, addCondition, appendRawCondition, removeRawCondition, spliceRawCondition,
                evaluationMode: _evaluationMode, setEvaluationMode,
                error, running,
                revert, save,
            }}
        >
            <div className={classNames(Style.RepositoryEditor, className)}>
                <BoxConditionLocation className={Style.SearchByZone}/>
                <BoxConditionHashtag className={Style.SearchByHashtags}/>
                <BoxConditionUser className={Style.SearchByUser}/>
                <BoxConditionDatetime className={Style.SearchByTimePeriod}/>
                <BoxConditions className={Style.Conditions}/>
                <BoxRepositoryCreate running={running} className={Style.CreateDialog}/>
            </div>
        </ContextRepositoryEditor.Provider>
    )
}
