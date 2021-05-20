export class Filter {
    constructor() {

    }

    exec(tweet) {
        return true
    }
}

export class ContainsFilter extends Filter {
    word

    constructor(word) {
        super()
        this.word = word.toLowerCase().trim()
    }

    exec(tweet) {
        return tweet.content?.toLowerCase().includes(this.word)
    }
}

export class UserFilter extends Filter {
    user

    constructor(user) {
        super()
        this.user = user.toLowerCase().trim().replace(/^@/, "")
    }

    exec(tweet) {
        return tweet.poster.toLowerCase() === this.user
    }
}

export class HasLocationFilter extends Filter {
    hasLocation

    constructor(hasLocation) {
        super()
        this.hasLocation = hasLocation
    }

    exec(tweet) {
        return (tweet["location"] !== null) === this.hasLocation
    }
}

export class HasPlaceFilter extends Filter {
    hasPlace

    constructor(hasPlace) {
        super()
        this.hasPlace = hasPlace
    }

    exec(tweet) {
        return (tweet["place"] !== null) === this.hasPlace
    }
}

