Date.prototype.toAwareISOString = function() {
    if(this.toString() === "Invalid Date") {
        throw new Error("Data non valida ricevuta come parametro.")
    }

    // Create a timezone naive ISO string
    const naive = this.toISOString()

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
