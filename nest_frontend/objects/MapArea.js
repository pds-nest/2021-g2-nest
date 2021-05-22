/**
 * An area on a map, defined by a latitude `lat`, a longitude `lng` and a radius `rad` in meters.
 */
export default class MapArea {
    /**
     * @param rad - Radius of the area in meters.
     * @param lat - Latitude of the center of the radius.
     * @param lng - Longitude of the center of the radius.
     */
    constructor(rad, lat, lng) {
        this.rad = rad
        this.lat = lat
        this.lng = lng
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.rad} ${this.lat.toFixed(7)} ${this.lng.toFixed(7)}`
    }

    /**
     * Render the MapArea as an human-readable string.
     *
     * @returns {string}
     */
    toHumanString() {
        if(this.rad >= 2000) {
            const kmRadius = Math.round(this.rad / 1000)
            return `${kmRadius}km ${this.lat.toFixed(3)} ${this.lng.toFixed(3)}`
        }
    }
}
