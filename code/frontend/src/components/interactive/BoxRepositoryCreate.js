import React from "react"
import BoxFull from "../base/BoxFull"
import FormLabelled from "../base/FormLabelled"
import FormLabel from "../base/formparts/FormLabel"
import InputWithIcon from "../base/InputWithIcon"
import { faFolder, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons"
import Radio from "../base/Radio"
import Button from "../base/Button"
import useRepositoryEditor from "../../hooks/useRepositoryEditor"
import FormAlert from "../base/formparts/FormAlert"


/**
 * A {@link BoxFull} allowing the user to save the changes made in the current {@link RepositoryEditor}.
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function BoxRepositoryCreate({ ...props }) {
    const {
        id,
        evaluationMode,
        setEvaluationMode,
        name,
        setName,
        save,
        error,
    } = useRepositoryEditor()

    return (
        <BoxFull header={"Create repository"} {...props}>
            <FormLabelled onSubmit={e => {e.preventDefault(); save()}}>
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
                            onChange={() => setEvaluationMode(0)}
                            checked={evaluationMode === 0}
                        />
                        At least one filter
                    </label>
                    &nbsp;
                    <label>
                        <Radio
                            name={"filter-mode"}
                            onChange={() => setEvaluationMode(1)}
                            checked={evaluationMode === 1}
                        />
                        Every filter
                    </label>
                </FormLabel>
                {error ?
                    <FormAlert color={"Red"}>
                        {error.toString()}
                    </FormAlert>
                 : null}
                {id ?
                     <Button
                         style={{"gridColumn": "1 / 3"}}
                         icon={faPencilAlt}
                         color={"Green"}
                         goTo={"/repositories"}
                         onClick={e => save()}
                     >
                         Edit repository
                     </Button>
                :
                    <Button
                        style={{"gridColumn": "1 / 3"}}
                        icon={faPlus}
                        color={"Green"}
                        goTo={"/repositories"}
                        onClick={e => save()}
                    >
                        Create repository
                    </Button>
                }

            </FormLabelled>
        </BoxFull>
    )
}
