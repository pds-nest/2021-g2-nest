/**
 * A pair of coordinates, latitude `lat` and longitude `lng`.
 */
export default class Coordinates {
    lat
    lng

    /**
     * @param lat - Latitude.
     * @param lng - Longitude.
     */
    constructor(lat, lng) {
        this.lat = lat
        this.lng = lng
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.lat.toFixed(7)} ${this.lng.toFixed(7)}`
    }

    /**
     * Render the Coordinates as an human-readable string.
     *
     * @returns {string}
     */
    toHumanString() {
        return `${this.lat.toFixed(3)} ${this.lng.toFixed(3)}`
    }

    /**
     * Transform the object in a Geolib compatible-one.
     */
    toGeolib() {
        return {
            latitude: this.lat,
            longitude: this.lng,
        }
    }
}
