import React from "react"
import BoxFull from "../base/BoxFull"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import InputWithIcon from "../base/InputWithIcon"
import { faBell, faPlus, faStopwatch, faThermometerThreeQuarters } from "@fortawesome/free-solid-svg-icons"
import Radio from "../base/Radio"
import Button from "../base/Button"
import FormAlert from "../base/formparts/FormAlert"
import useStrings from "../../hooks/useStrings"


export default function BoxAlertCreate(
    {
        name,
        setName,
        evaluationMode,
        setEvaluationMode,
        limit,
        setLimit,
        windowSize,
        setWindowSize,
        running,
        error,
        save,
        ...props
    }) {

    const strings = useStrings()

    return (
        <BoxFull header={strings.createRepo} {...props}>
            <FormLabelled
                onSubmit={e => {
                    e.preventDefault()
                    save()
                }}
            >
                <FormLabel htmlFor={"alert-name"} text={strings.alertName}>
                    <InputWithIcon
                        id={"alert-name"}
                        icon={faBell}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormLabel>
                <FormLabel htmlFor={"filter-mode"} text={strings.request}>
                    <label>
                        <Radio
                            name={"filter-mode"}
                            onChange={() => setEvaluationMode(0)}
                            checked={evaluationMode === 0}
                        />
                        {strings.filterOR}
                    </label>
                    &nbsp;
                    <label>
                        <Radio
                            name={"filter-mode"}
                            onChange={() => setEvaluationMode(1)}
                            checked={evaluationMode === 1}
                        />
                        {strings.filterAND}
                    </label>
                </FormLabel>
                <FormLabel htmlFor={"alert-limit"} text={strings.alertLimit}>
                    <InputWithIcon
                        id={"alert-limit"}
                        type={"number"}
                        icon={faThermometerThreeQuarters}
                        value={limit}
                        onChange={e => setLimit(e.target.value)}
                    />
                </FormLabel>
                <FormLabel htmlFor={"alert-window"} text={strings.alertWindow}>
                    <InputWithIcon
                        id={"alert-window"}
                        type={"number"}
                        icon={faStopwatch}
                        value={windowSize}
                        onChange={e => setWindowSize(e.target.value)}
                    />
                </FormLabel>
                {error ?
                 <FormAlert color={"Red"}>
                     {strings[error.data.code]}
                 </FormAlert>
                       : null}
                 <Button
                     style={{ "gridColumn": "1 / 3" }}
                     icon={faPlus}
                     color={"Green"}
                     onClick={save}
                     disabled={running}
                 >
                     {strings.createAlert}
                 </Button>
            </FormLabelled>
        </BoxFull>
    )
}
