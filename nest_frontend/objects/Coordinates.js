/**
 * A pair of coordinates, latitude `lat` and longitude `lng`.
 */
import { LatLng } from "leaflet/dist/leaflet-src.esm"


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
     * Create a new {@link Coordinates} from the format used by the backend.
     *
     * @param str - The string to create the object from.
     * @returns {Coordinates}
     */
    static fromCrawlerString(str) {
        const match = /[{]([0-9.]+),([0-9.]+)[}]/.exec(str)
        if(!match) {
            throw new Error(`Invalid location string: ${str}`)
        }
        return new Coordinates(match[1], match[2])
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
     * Transform this object in a Geolib compatible-one.
     */
    toGeolib() {
        return {
            latitude: this.lat,
            longitude: this.lng,
        }
    }

    /**
     * Transform this object in a 2-ple.
     *
     * @returns {[Number, Number]}
     */
    toArray() {
        return [this.lat, this.lng]
    }

    /**
     * Transform this object in a {@link LatLng} / Leaflet compatible-one.
     *
     * @returns {LatLng}
     */
    toLatLng() {
        return new LatLng(this.lat, this.lng)
    }
}
