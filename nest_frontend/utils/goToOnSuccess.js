/**
 * Decorator which adds a redirect on success to an event handler.
 *
 * @param func - The function to decorate.
 * @param history - The history to push the destination to.
 * @param destination - The path of the destination.
 * @returns {(function(): void)|*}
 */
export default function goToOnSuccess(func, history, destination) {
    return (...args) => {
        let result
        try {
            console.debug("Provando ad eseguire: ", func)
            result = func(...args)
            history.push(destination)
            return result
        }
        catch(e) {
            console.debug("Esecuzione fallita: ", func, ", non ha fatto nulla.")
            throw e
        }
    }
}
