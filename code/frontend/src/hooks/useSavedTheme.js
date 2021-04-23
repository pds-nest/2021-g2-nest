import { useState } from "react"


/**
 * Hook with the same API as {@link React.useState} which stores the user's current theme setting, and syncs it to the
 * browser's {@link localStorage}.
 *
 * @todo Perhaps this could be refactored into a general "useLocalStorageState" component?
 * @returns {[string, function]}
 */
export default function useSavedTheme() {
    const loadTheme = () => {
        if(localStorage) {
            console.debug(`Loading theme from localStorage...`)
            let value = localStorage.getItem("theme")

            if(value) {
                console.debug(`Loaded theme ${value}!`)
                return value
            }
            else {
                console.debug(`There is no theme stored in the localStorage; setting to "ThemeDark"...`)
                return "ThemeDark"
            }
        }
        else {
            console.warn(`Can't load theme; localStorage doesn't seem to be available; setting to "ThemeDark"...`)
            return "ThemeDark"
        }
    }

    const [theme, _setTheme] = useState(loadTheme());

    const setTheme = (value) => {
        console.debug(`Changing theme to ${value}...`)
        _setTheme(value)
    }

    const saveTheme = (value) => {
        if(localStorage) {
            console.debug(`Saving theme ${value} to localStorage...`)
            localStorage.setItem("theme", value)
        }
        else {
            console.warn(`Can't save theme; localStorage doesn't seem to be available...`)
        }
    }

    const setAndSaveTheme = (value) => {
        setTheme(value)
        saveTheme(value)
    }

    return [theme, setAndSaveTheme]
}