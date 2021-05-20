import sw from "stopword"


const stopwords = [...sw.it, ...sw.en, "rt"]


export default function(tweets = {}) {
    let preprocessedWords = {}
    for(const tweet of tweets) {
        if(!tweet.content) {
            continue
        }
        for(const word of tweet.content.toLowerCase().split(/\s+/)) {
            if(stopwords.includes(word)) continue
            if(word.startsWith("https://")) continue

            if(!preprocessedWords.hasOwnProperty(word)) {
                preprocessedWords[word] = 0
            }
            preprocessedWords[word] += 1
        }
    }

    let processedWords = []
    for(const word in preprocessedWords) {
        if(!preprocessedWords.hasOwnProperty(word)) {
            continue
        }
        processedWords.push({
            text: word,
            value: preprocessedWords[word]
        })
    }
    return processedWords
}