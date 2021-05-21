export const locationRegex = /[{](?<lat>[0-9.]+),(?<lng>[0-9.]+)[}]/


export class Location {
    lat
    lng

    constructor(lat, lng) {
        this.lat = lat
        this.lng = lng
    }

    static fromString(locString) {
        const match = locationRegex.exec(locString)
        if(!match) {
            throw new Error(`Invalid location string: ${locString}`)
        }
        const { lat, lng } = match.groups
        return new Location(lat, lng)
    }

    static fromTweet(tweet) {
        if(tweet.location === null) {
            throw new Error(`Tweet has no location: ${tweet}`)
        }

        return Location.fromString(tweet.location)
    }

    toArray() {
        return [this.lat, this.lng]
    }

    toString() {
        return `${this.lat.toFixed(3)} ${this.lng.toFixed(3)}`
    }
}
