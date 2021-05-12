import isString from "is-string"


export default function makeURLSearchParams(obj) {
    let usp = new URLSearchParams()
    for(const key in obj) {
        if(!obj.hasOwnProperty(key)) {
            return
        }
        const value = obj[key]
        if(isString(value)) {
            usp.set(key, value)
        }
        else {
            usp.set(key, JSON.stringify(value))
        }
    }
    return usp
}