/**
 * Decorator which adds a redirect on success to an event handler.
 *
 * @param func - The function to decorate.
 * @param history - The history to push the destination to.
 * @param destination - The path of the destination.
 * @returns {(function(): void)|*}
 */
export default function goToOnSuccess(func, history, destination) {
    return ([...args]) => {
        let success = false
        try {
            func(...args)
            success = true
        }
        catch(e) {
            success = false
        }
        if(success) {
            history.push(destination)
        }
    }
}
