import { SerializationError } from "./Errors"


/**
 * An half-line of time, defined by a `date` and a boolean `isBefore` indicating if the time before or after the
 * specified date should be selected.
 */
export default class TimeRay {
    isBefore
    date

    /**
     * @param isBefore - `true` to select times earlier than the date, `false` to select times after the date.
     * @param date - The date to start measurements from.
     */
    constructor(isBefore, date) {
        this.isBefore = isBefore
        this.date = date
    }

    static rawRegex = /^(?<isBefore>[><]) (?<date>.+)$/

    static fromRaw(data) {
        const match = this.rawRegex.exec(data)

        if(!match) throw new SerializationError(data)

        const isBefore = match.groups.isBefore === "<"
        const date = new Date(match.groups.date)
        return new TimeRay(isBefore, date)
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.isBefore ? "<" : ">"} ${this.date.toISOString()}`
    }

    includes(date) {
        return Boolean((
            this.date > date
        ) ^ this.isBefore)
    }
}
