export default function objectToWordcloudFormat(words) {
    let result = []
    for(const word in words) {
        if(!words.hasOwnProperty(word)) {
            continue
        }
        result.push({
            text: word,
            value: words[word],
        })
    }
    return result
}