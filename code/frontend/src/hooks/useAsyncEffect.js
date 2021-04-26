/* eslint-disable */
import { useEffect } from "react"


/**
 * {@link useEffect}, but with an async effect.
 *
 * @warning Breaks `react-hooks/exaustive-deps`.
 *
 * @param effect - The async effect.
 * @param deps - The dependencies of the hook.
 */
export default function useAsyncEffect(effect, deps) {
    useEffect(() => {
        effect()
    }, [effect, ...deps])
}
