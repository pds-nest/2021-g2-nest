import { useCallback, useEffect, useState } from "react"


/**
 * Hook with the same API as {@link React.useState} which stores its value in the browser's {@link localStorage}.
 */
export default function useLocalStorageState(key, def) {
    const [value, setValue] = useState(null);

    /**
     * Load the `key` from the {@link localStorage} into `value`, defaulting to `def` if it is not found.
     */
    const load = useCallback(
        () => {
            if(localStorage) {
                console.debug(`Loading ${key} from localStorage...`)
                let _value = JSON.parse(localStorage.getItem(key))

                if(_value) {
                    console.info(`Loaded ${key} from localStorage!`)
                    return _value
                }
                else {
                    console.info(`There is no value ${key} stored, defaulting...`)
                    return def
                }
            }
            else {
                console.warn(`Can't load value as localStorage doesn't seem to be available, defaulting...`)
                return def
            }
        },
        [key, def]
    )

    /**
     * Save a value to the {@link localStorage}.
     */
    const save = useCallback(
        (value) => {
            if(localStorage) {
                console.debug(`Saving ${key} to localStorage...`)
                localStorage.setItem(key, JSON.stringify(value))
            }
            else {
                console.warn(`Can't save ${key}; localStorage doesn't seem to be available...`)
            }
        },
        [key]
    )

    /**
     * Set `value` and save it to the {@link localStorage}.
     */
    const setAndSave = useCallback(
        (value) => {
            setValue(value)
            save(value)
        },
        [setValue, save]
    )

    /*
     * When the component first renders, try to load the value from the localStorage.
     */
    useEffect(
        () => {
            if(!value) {
                console.debug(`This is the first render, loading ${key} from the localStorage...`)
                setValue(load())
            }
        },
        [value, setValue, load, key],
    )

    return [value, setAndSave]
}