import {
    faAt,
    faClock,
    faFilter,
    faFont,
    faHashtag,
    faLocationArrow,
    faMapMarkerAlt,
    faMapPin,
} from "@fortawesome/free-solid-svg-icons"


/**
 * A filter applicable in the Analysis mode.
 */
export class Filter {
    negate

    /**
     * @param negate - If the filter output should be reversed.
     */
    constructor(negate = false) {
        this.negate = negate
    }

    /**
     * Check if a tweet passed through the filter or not, without applying `negate`.
     *
     * @param tweet - The tweet to check.
     * @returns {boolean}
     */
    check(tweet) {
        return true
    }

    /**
     * Check if a tweet passed through the filter or not, applying `negate`.
     *
     * @param tweet - The tweet to check.
     * @returns {boolean}
     */
    exec(tweet) {
        return Boolean(this.check(tweet) ^ this.negate)
    }

    display() {
        return {
            color: "Grey",
            icon: faFilter,
            children: this.negate ? "False" : "True"
        }
    }
}


/**
 * Checks if a tweet contains a string.
 */
export class FilterContains extends Filter {
    string

    constructor(word, negate = false) {
        super(negate)
        this.string = word.toLowerCase().trim()
    }

    check(tweet) {
        return tweet.content?.toLowerCase().includes(this.string)
    }

    display() {
        return {
            color: "Grey",
            icon: faFont,
            children: this.string
        }
    }
}


/**
 * Check if a tweet contains an hashtag.
 */
export class FilterHashtag extends FilterContains {
    hashtag

    constructor(hashtag, negate = false) {
        super(negate, `#${hashtag}`)
        this.hashtag = hashtag
    }

    display() {
        return {
            color: "Grey",
            icon: faHashtag,
            children: this.hashtag
        }
    }
}


/**
 * Check if a tweet was posted by a certain user.
 */
export class FilterPoster extends Filter {
    poster

    constructor(poster, negate = false) {
        super(negate)
        this.poster = poster
    }

    check(tweet) {
        return tweet.poster.toLowerCase() === this.poster.toLowerCase()
    }

    display() {
        return {
            color: "Green",
            icon: faAt,
            children: this.poster
        }
    }
}


/**
 * Check if a tweet contains `location` metadata.
 */
export class FilterWithLocation extends Filter {
    constructor(negate = false) {
        super(negate)
    }

    check(tweet) {
        return Boolean(tweet["location"])
    }

    display() {
        return {
            color: "Red",
            icon: faLocationArrow,
            children: ""
        }
    }
}


/**
 * Check if a tweet contains `place` metadata.
 */
export class FilterWithPlace extends Filter {
    constructor(negate = false) {
        super(negate)
    }

    check(tweet) {
        return Boolean(tweet["place"])
    }

    display() {
        return {
            color: "Red",
            icon: faMapMarkerAlt,
            children: ""
        }
    }
}


/**
 * Check if a tweet's `location` is inside a {@link MapArea}.
 */
export class FilterInsideMapArea extends FilterWithLocation {
    mapArea

    constructor(mapArea, negate = false) {
        super(negate)
        this.mapArea = mapArea
    }

    check(tweet) {
        if(!super.check(tweet)) {
            return false
        }

        return this.mapArea.includes(tweet.location)
    }

    display() {
        return {
            color: "Red",
            icon: faLocationArrow,
            children: this.mapArea.toHumanString()
        }
    }
}


/**
 * Check if a tweet's `post_time` is inside a {@link TimeRay}.
 */
export class FilterInsideTimeRay extends Filter {
    timeRay

    constructor(timeRay, negate = false) {
        super(negate)
        this.timeRay = timeRay
    }

    check(tweet) {
        return this.datetime < new Date(tweet["insert_time"])
    }

    display() {
        return {
            color: "Yellow",
            icon: faClock,
            children: this.timeRay.toString()
        }
    }
}
