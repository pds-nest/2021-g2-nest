import useLocalStorageState from "./useLocalStorageState"


/**
 * Hook with the same API as {@link React.useState} which stores the user's current theme setting, and syncs it to the
 * browser's {@link localStorage}.
 *
 * @returns {[string, function]}
 */
export default function useSavedTheme() {
    return useLocalStorageState("theme", "ThemeDark")
}
