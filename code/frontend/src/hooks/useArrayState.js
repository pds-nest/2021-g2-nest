import { useCallback, useState } from "react"


export default function useArrayState(def) {
    const [value, setValue] = useState(def ?? [])

    const appendValue = useCallback(
        newSingle => {
            setValue(
                oldArray => [...oldArray, newSingle]
            )
        },
        [value, setValue]
    )

    const removeValue = useCallback(
        position => {
            setValue(
                oldArray => {
                    // TODO: Hope this doesn't break anything...
                    oldArray.splice(position, 1)
                    return oldArray
                }
            )
        }
    )

    return {value, setValue, appendValue, removeValue}
}