import { useEffect, useState } from "react"


/**
 * Hook with the same API as {@link React.useState} which stores its value in the browser's {@link localStorage}.
 */
export default function useLocalStorageState(key, def) {
    const [value, setValue] = useState(null);

    const load = () => {
        if(localStorage) {
            console.debug(`Loading ${key} from localStorage...`)
            let value = JSON.parse(localStorage.getItem(key))

            if(value) {
                console.debug(`Loaded ${key} from localStorage!`)
                return value
            }
            else {
                console.debug(`There is no value ${key} stored, defaulting...`)
                return def
            }
        }
        else {
            console.warn(`Can't load value as localStorage doesn't seem to be available, defaulting...`)
            return def
        }
    }

    useEffect(() => {
        if(!value) {
            setValue(load())
        }
    }, [value])

    const save = (value) => {
        if(localStorage) {
            console.debug(`Saving ${key} to localStorage...`)
            localStorage.setItem(key, JSON.stringify(value))
        }
        else {
            console.warn(`Can't save theme; localStorage doesn't seem to be available...`)
        }
    }

    const setAndSave = (value) => {
        setValue(value)
        save(value)
    }

    return [value, setAndSave]
}