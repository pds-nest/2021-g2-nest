import { useCallback, useState } from "react"


export default function useArrayState(def) {
    const [value, setValue] = useState(def ?? [])

    const appendValue = useCallback(
        newSingle => {
            setValue(
                oldArray => [...oldArray, newSingle]
            )
        },
        []
    )

    const spliceValue = useCallback(
        position => {
            setValue(
                oldArray => {
                    // TODO: Hope this doesn't break anything...
                    oldArray.splice(position, 1)
                    return oldArray
                }
            )
        },
        []
    )

    const removeValue = useCallback(
        remValue => {
            setValue(
                oldArray => oldArray.filter(item => item !== remValue)
            )
        },
        []
    )

    return {value, setValue, appendValue, spliceValue, removeValue}
}