import React, { useCallback, useState } from "react"
import ContextConditionEditor from "../../contexts/ContextConditionEditor"
import useArrayState from "../../hooks/useArrayState"
import Style from "./RepositoryEditor.module.css"
import BoxConditionLocation from "../interactive/BoxConditionLocation"
import BoxConditionHashtag from "../interactive/BoxConditionHashtag"
import BoxConditionUser from "../interactive/BoxConditionUser"
import BoxConditionDatetime from "../interactive/BoxConditionDatetime"
import BoxConditions from "../interactive/BoxConditions"
import classNames from "classnames"
import { Condition } from "../../objects/Condition"
import useBackendViewset from "../../hooks/useBackendViewset"
import { Redirect, useParams } from "react-router"
import BoxAlertCreate from "../interactive/BoxAlertCreate"


export default function AlertEditor({className}) {
    /** The connected repository id. */
    const {id: repoId} = useParams()

    /** The alert name. */
    const [_name, setName] = useState("")

    /** The alert limit. */
    const [limit, setLimit] = useState(10)

    /** The window size. */
    const [windowSize, setWindowSize] = useState(24)

    /** The conditions of the data gathering. */
    const {
        value: rawConditions,
        setValue: setRawConditions,
        appendValue: appendRawCondition,
        removeValue: removeRawCondition,
        spliceValue: spliceRawCondition,
    } = useArrayState([])
    const _conditions = rawConditions.map(cond => Condition.fromRaw(cond))

    /** The operator the conditions should be evaluated with. */
    const [_evaluationMode, setEvaluationMode] = useState(0)

    /** The backend viewset to use to create / edit the repository. */
    const {running, error, createResource} = useBackendViewset(
        `/api/v1/repositories/${repoId}/alerts/`,
        "name",
        {
            list: false,
            create: true,
            retrieve: false,
            edit: false,
            destroy: false,
            command: false,
            action: false,
        }
    )

    /** If `true`, switches to the repository page on the next render. */
    const [switchPage, setSwitchPage] = useState(false)

    /**
     * Save the current changes, creating or editing it as needed.
     */
    const save = useCallback(
        async () => {
            const body = {
                "repository_id": repoId,
                "name": _name,
                "window_size": windowSize,
                "limit": limit,
                "evaluation_mode": _evaluationMode,
                "conditions": _conditions,
            }

            console.info("Creating new alert with body: ", body)
            await createResource(body)
            setSwitchPage(true)
        },
        [repoId, createResource, _conditions, _evaluationMode, _name, limit],
    )

    /**
     * Try to add a new condition, logging a message to the console if something goes wrong.
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
        return <Redirect to={`/repositories/${repoId}/alerts/`}/>
    }

    return (
        <ContextConditionEditor.Provider
            value={{
                conditions: _conditions, addCondition, appendRawCondition, removeRawCondition, spliceRawCondition,
            }}
        >
            <div className={classNames(Style.RepositoryEditor, className)}>
                <BoxConditionLocation className={Style.SearchByZone}/>
                <BoxConditionHashtag className={Style.SearchByHashtags}/>
                <BoxConditionUser className={Style.SearchByUser}/>
                <BoxConditionDatetime className={Style.SearchByTimePeriod}/>
                <BoxConditions className={Style.Conditions}/>
                <BoxAlertCreate
                    className={Style.CreateDialog}
                    name={_name}
                    setName={setName}
                    evaluationMode={_evaluationMode}
                    setEvaluationMode={setEvaluationMode}
                    limit={limit}
                    setLimit={setLimit}
                    windowSize={windowSize}
                    setWindowSize={setWindowSize}
                    running={running}
                    error={error}
                    save={save}
                />
            </div>
        </ContextConditionEditor.Provider>
    )
}
