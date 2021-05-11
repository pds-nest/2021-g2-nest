import { useCallback, useState } from "react"


/**
 * An hook similar to {@link useState} which stores an array of values.
 *
 * @param def - The starting value of the hook.
 * @returns {{spliceValue, removeValue, setValue, appendValue, value}}
 */
export default function useArrayState(def) {
    const [value, setValue] = useState(def ?? [])

    const appendValue = useCallback(
        newSingle => {
            console.debug("Appending ", newSingle, " to ArrayState")
            setValue(
                oldArray => [...oldArray, newSingle],
            )
        },
        [],
    )

    const spliceValue = useCallback(
        position => {
            console.debug("Splicing ", position, " from ArrayState")
            setValue(
                oldArray => {
                    // TODO: Hope this doesn't break anything...
                    oldArray.splice(position, 1)
                    return oldArray
                },
            )
        },
        [],
    )

    const removeValue = useCallback(
        remValue => {
            console.debug("Removing ", remValue, " from ArrayState")
            setValue(
                oldArray => oldArray.filter(item => JSON.stringify(item) !== JSON.stringify(remValue)),
            )
        },
        [],
    )

    return { value, setValue, appendValue, spliceValue, removeValue }
}