import { IconDefinition, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"


/**
 * Condition class for an undefined/unknown condition.
 *
 * See [the Condition spec](https://gitlab.steffo.eu/nest/g2-progetto/-/wikis/sprint-2/Specifica-delle-Conditions).
 */
export class Condition {
    content
    type
    id

    constructor(type, content, id = null) {
        this.content = content
        this.type = type
        this.id = id
    }

    /**
     * Get the condition as an object readable by the backend.
     *
     * @returns {{id, type, content}}
     */
    serialize() {
        return {
            type: this.type,
            content: this.content,
            id: this.id,
        }
    }

    /**
     * Display parameters for the badge representing this condition.
     *
     * @returns {{color: string, icon: IconDefinition, title, content}}
     */
    display() {
        return {
            color: "Grey",
            icon: faQuestionCircle,
            title: this.id,
            content: this.content,
        }
    }
}


/**
 * Require a tweet to contain a specific hashtag to be gathered.
 */
export class ConditionHashtag extends Condition {
    constructor(hashtag, id = null) {
        super(0, hashtag, id)
    }
}


/**
 * Require a tweet to be posted by a certain user to be gathered.
 */
export class ConditionUser extends Condition {
    constructor(user, id = null) {
        super(5, user, id)
    }
}


/**
 * Require a tweet to be posted before or after a certain time to be gathered.
 */
export class ConditionTime extends Condition {
    timeRay

    constructor(timeRay, id = null) {
        super(2, timeRay.toString(), id)
        this.timeRay = timeRay
    }
}


/**
 * Require a tweet to have coordinates associated and to be posted within the {@link MapArea}.
 */
export class ConditionLocation extends Condition {
    mapArea

    constructor(mapArea, id = null) {
        super(3, mapArea.toString(), id)
        this.mapArea = mapArea
    }
}
