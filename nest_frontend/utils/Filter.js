import { Location } from "./location"
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
        super(negate, `#${hashtag}`)
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
    constructor(negate) {
        super(negate)
    }

    check(tweet) {
        return Boolean(tweet["location"])
    }

    color() {
        return "Red"
    }

    icon() {
        return faMapMarkerAlt
    }

    text() {
        return ""
    }
}


export class HasPlaceFilter extends Filter {
    constructor(negate) {
        super(negate)
    }

    check(tweet) {
        return Boolean(tweet["place"])
    }

    color() {
        return "Red"
    }

    icon() {
        return faLocationArrow
    }

    text() {
        return ""
    }
}


export class LocationRadiusFilter extends HasLocationFilter {
    center
    radius

    constructor(negate, center, radius) {
        super(negate)
        this.center = center
        this.radius = radius
    }

    check(tweet) {
        if(!super.check(tweet)) {
            return false
        }

        // FIXME: Maths is hard
        const location = Location.fromTweet(tweet)
        const latDiff = Math.abs(location.lat - this.center.lat)
        const lngDiff = Math.abs(location.lng - this.center.lng)
        const squaredDistance = Math.pow(latDiff, 2) + Math.pow(lngDiff, 2)
        const squaredRadius = Math.pow(this.radius, 2)

        return squaredDistance < squaredRadius
    }

    color() {
        return "Red"
    }

    icon() {
        return faMapPin
    }

    text() {
        return `< ${this.radius}m ${this.center.lat.toFixed(3)} ${this.center.lng.toFixed(3)}`
    }
}


export class AfterDatetimeFilter extends Filter {
    datetime

    constructor(negate, datetime) {
        super(negate)
        this.datetime = datetime
    }

    check(tweet) {
        return this.datetime < new Date(tweet["insert_time"])
    }

    color() {
        return "Yellow"
    }

    icon() {
        return faClock
    }

    text() {
        return `${this.negate ? "<" : ">"} ${this.datetime.toISOString()}`
    }
}