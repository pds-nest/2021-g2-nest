/**
 * Decorator which adds a redirect on success to an event handler.
 *
 * @param func - The function to decorate.
 * @param history - The history to push the destination to.
 * @param destination - The path of the destination.
 */
export default function goToOnSuccess(func, history, destination) {
    return async (...args) => {
        let result
        try {
            console.debug("Executing: ", func)
            result = await func(...args)
            console.debug("Executed successfully: ", func, " moving to a different page.")
            history.push(destination)
            return result
        }
        catch(e) {
            console.debug("Execution failed: ", func, ", not doing anything.")
            throw e
        }
    }
}
