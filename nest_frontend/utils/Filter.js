import {Location} from "./location"
import {
    faAt,
    faFilter,
    faFont, faHashtag,
    faLocationArrow,
    faMap,
    faMapMarkerAlt,
    faMapPin,
} from "@fortawesome/free-solid-svg-icons"


export class Filter {
    negate

    constructor(negate) {
        this.negate = negate
    }

    check(tweet) {
        return true
    }

    exec(tweet) {
        return this.check(tweet) ^ this.negate
    }

    color() {
        return "Grey"
    }

    icon() {
        return faFilter
    }

    text() {
        return this.negate ? "False" : "True"
    }
}

export class ContainsFilter extends Filter {
    word

    constructor(negate, word) {
        super(negate)
        this.word = word.toLowerCase().trim()
    }

    check(tweet) {
        return tweet.content?.toLowerCase().includes(this.word)
    }

    color() {
        return "Grey"
    }

    icon() {
        return faFont
    }

    text() {
        return this.word
    }
}


export class HashtagFilter extends ContainsFilter {
    hashtag

    constructor(negate, hashtag) {
        super(negate, `#${hashtag}`);
        this.hashtag = hashtag
    }

    icon() {
        return faHashtag
    }

    text() {
        return this.hashtag
    }
}


export class UserFilter extends Filter {
    user

    constructor(negate, user) {
        super(negate)
        this.user = user.toLowerCase().trim().replace(/^@/, "")
    }

    check(tweet) {
        return tweet.poster.toLowerCase() === this.user
    }

    color() {
        return "Green"
    }

    icon() {
        return faAt
    }

    text() {
        return this.user
    }
}


export class HasLocationFilter extends Filter {
    hasLocation

    constructor(negate, hasLocation) {
        super(negate)
        this.hasLocation = hasLocation
    }

    check(tweet) {
        return (tweet["location"] !== null) === this.hasLocation
    }

    color() {
        return "Red"
    }

    icon() {
        return faMapMarkerAlt
    }

    text() {
        return this.hasLocation
    }
}


export class HasPlaceFilter extends Filter {
    hasPlace

    constructor(negate, hasPlace) {
        super(negate)
        this.hasPlace = hasPlace
    }

    check(tweet) {
        return (tweet["place"] !== null) === this.hasPlace
    }

    color() {
        return "Red"
    }

    icon() {
        return faLocationArrow
    }

    text() {
        return this.hasPlace
    }
}


export class LocationRadiusFilter extends HasLocationFilter {
    center
    radius

    constructor(negate, center, radius) {
        super(negate, true);
        this.center = center
        this.radius = radius
    }

    check(tweet) {
        if(!super.check(tweet)) {
            return false
        }

        // FIXME: assuming the earth is flat
        const location = Location.fromTweet(tweet)
        const latDiff = Math.abs(location.lat - this.center.lat)
        const lngDiff = Math.abs(location.lng - this.center.lng)
        const squaredDistance = Math.pow(latDiff, 2) + Math.pow(lngDiff, 2)
        const squaredRadius = Math.pow(radius, 2)

        return squaredDistance < squaredRadius
    }

    color() {
        return "Red"
    }

    icon() {
        return faMapPin
    }

    text() {
        return `< ${this.radius} ${this.center.toString()}`
    }
}
