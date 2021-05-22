import {getDistance} from "geolib"


/**
 * An area on a map, defined by a `center` and a `radius` in meters.
 */
export default class MapArea {
    radius
    center

    /**
     * @param radius - The radius of the area in meters.
     * @param center - The center of the area.
     */
    constructor(radius, center) {
        this.radius = radius
        this.center = center
    }

    /**
     * @returns {string}
     */
    toString() {
        return `${this.radius} ${this.center.toString()}`
    }

    /**
     * Render the MapArea as an human-readable string.
     *
     * @returns {string}
     */
    toHumanString() {
        if(this.radius >= 2000) {
            const kmRadius = Math.round(this.radius / 1000)
            return `${kmRadius}km ${this.center.toHumanString()}`
        }
        return `${this.radius}m ${this.center.toHumanString()}`
    }

    /**
     * Check if a pair of coordinates is included in the area.
     *
     * @param coords - The coordinates to check.
     * @returns {boolean}
     */
    includes(coords) {
        return getDistance(this.center.toGeolib(), coords.toGeolib()) <= this.radius
    }
}
