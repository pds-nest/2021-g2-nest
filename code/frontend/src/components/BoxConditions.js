import React, { useContext } from "react"
import BoxFull from "./BoxFull"
import ContextRepositoryEditor from "../contexts/ContextRepositoryEditor"
import ConditionBadge from "./ConditionBadge"


export default function BoxConditions({ ...props }) {
    const {conditions} = useContext(ContextRepositoryEditor)

    const badges = conditions.map((cond, pos) => <ConditionBadge key={pos} {...cond}/>)

    return (
        <BoxFull header={"Conditions"} {...props}>
            {badges}
        </BoxFull>
    )
}
