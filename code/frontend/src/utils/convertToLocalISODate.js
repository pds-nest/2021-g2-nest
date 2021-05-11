// Wow, JS, davvero?
// Davvero tutte le date.toISOString() sono considerate UTC?
// Wow.

/**
 * Convert a {@link Date} object to a timezone aware ISO String, using the user's local timezone.
 *
 * @param date
 * @returns {string}
 */
export default function convertToLocalISODate(date) {
    if(date.toString() === "Invalid Date") {
        throw new Error("Received an Invalid Date as parameter.")
    }

    // Create a timezone naive ISO string
    const naive = date.toISOString()

    // Find the local timezone
    const tz = -new Date().getTimezoneOffset()

    // Convert the timezone to hours
    const tzHours = Math.abs(Math.floor(tz / 60)).toString().padStart(2, "0")

    // Find the minutes
    const tzMinutes = (
        tz % 60
    ).toString().padStart(2, "0")

    // Replace the naive part with the aware part
    return naive.replace("Z", `${tz < 0 ? "-" : "+"}${tzHours}${tzMinutes}`)
}