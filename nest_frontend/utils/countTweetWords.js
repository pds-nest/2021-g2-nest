import sw from "stopword"


const stopwords = [...sw.it, ...sw.en, "rt"]


export default function countTweetWords(tweets = {}) {
    let words = {}
    for(const tweet of tweets) {
        if(!tweet.content) {
            continue
        }
        for(const word of tweet.content.toLowerCase().split(/\s+/)) {
            if(stopwords.includes(word)) continue
            if(word.startsWith("https://")) continue

            if(!words.hasOwnProperty(word)) {
                words[word] = 0
            }
            words[word] += 1
        }
    }
    return words
}
