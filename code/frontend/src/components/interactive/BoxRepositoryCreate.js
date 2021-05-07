import React from "react"
import BoxFull from "../base/BoxFull"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import InputWithIcon from "../base/InputWithIcon"
import { faFolder, faPlus } from "@fortawesome/free-solid-svg-icons"
import Radio from "../base/Radio"
import Button from "../base/Button"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"


export default function BoxRepositoryCreate({ ...props }) {
    const {
        evaluationMode,
        setEvaluationMode,
        name,
        setName,
        save,
    } = useRepositoryEditor()

    return (
        <BoxFull header={"Create repository"} {...props}>
            <FormLabelled>
                <FormLabel htmlFor={"repo-name"} text={"Repository name"}>
                    <InputWithIcon
                        id={"repo-name"}
                        icon={faFolder}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormLabel>
                <FormLabel htmlFor={"filter-mode"} text={"Add tweets if they satisfy"}>
                    <label>
                        <Radio
                            name={"filter-mode"}
                            onClick={() => setEvaluationMode(0)}
                            checked={evaluationMode === 0}
                        />
                        At least one filter
                    </label>
                    &nbsp;
                    <label>
                        <Radio
                            name={"filter-mode"}
                            onClick={() => setEvaluationMode(1)}
                            checked={evaluationMode === 1}
                        />
                        Every filter
                    </label>
                </FormLabel>
                <Button style={{"gridColumn": "1 / 3"}} icon={faPlus} color={"Green"} onClick={e => save()}>
                    Create repository
                </Button>
            </FormLabelled>
        </BoxFull>
    )
}
