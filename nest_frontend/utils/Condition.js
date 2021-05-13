import isString from "is-string"


const typeEnums = {
    "HASHTAG": 0,
    "TIME": 2,
    "COORDINATES": 3,
    "PLACE": 4,
    "USER": 5,
}


/**
 * A search/filtering Condition.
 *
 * See https://gitlab.steffo.eu/nest/g2-progetto/-/wikis/Specifica-delle-Conditions .
 */
export default class Condition {

    /**
     * Create a new Condition.
     *
     * @param type - The type of Condition to create.
     *               It can be a number or one of the following strings:
     *               `"hashtag"`, `"time"`, `"coordinates"`, `"place"`.
     * @param content - The content of the Condition.
     * @param id - The id of the Condition on the backend, or null if the Condition hasn't been committed yet.
     */
    constructor(type, content, id = null) {
        if(isString(type)) {
            this.type = typeEnums[type.toUpperCase()]
        }
        else {
            this.type = type
        }

        this.content = content
        this.id = id
    }
}
