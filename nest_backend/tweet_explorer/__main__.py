from nest_backend.app import app
from nest_backend.database import *
import tweepy as tw
import nltk
from nltk.corpus import stopwords


ext.init_app(app=app)


def authenticate():
    c_k = "GEhtSyP9e98mzFeiOCSW0lvQX"
    c_s = "438cmYrl5xqaX2W7I2Bf5A9nF1pN5VtM9f77WYQnAXg1BwKJ27"
    a_t = "1380217745732689921-8gCfr8Zx9YHKvo4OVP3HAr3kfMRkgz"
    a_t_s = "jGOlgTs1i1itGMxDxAqFEDnv7QAui772n9hGxeSIKcwzS"

    auth = tw.OAuthHandler(c_k, c_s)
    auth.set_access_token(a_t, a_t_s)
    api = tw.API(auth, wait_on_rate_limit=True)
    return api


def start_exploring():
    api = authenticate()
    most_popular_hashtags = dict()
    most_popular_words = dict()
    geocode="34.0999996,-118.333332,1000km"
    for tweet in tw.Cursor(method = api.search, q="Draghi OR Oscar", lang="it").items(50):
        print(tweet.user.name + ' : ' + tweet.text)
        for hashtag in tweet.entities['hashtags']:
            if hashtag['text'] in most_popular_hashtags.keys():
                most_popular_hashtags[hashtag['text']] += 1
            else:
                most_popular_hashtags[hashtag['text']] = 1

        stop_words = set(stopwords.words('italian'))
        stop_words.add("RT")

        word_tokens = nltk.word_tokenize(tweet.text)

        filtered_sentence = [w for w in word_tokens if not w.lower() in stop_words and w.isalpha()]
        for word in filtered_sentence:
            if word in most_popular_words.keys():
                most_popular_words[word] += 1
            else:
                most_popular_words[word] = 1

    print(dict(sorted(most_popular_hashtags.items(), key=lambda item: item[1])))
    print(dict(sorted(most_popular_words.items(), key=lambda item: item[1])))


def search_repo_conditions(repository_id, all_or):
    repo = Repository.query.filter_by(id=repository_id).first()
    conditions = [use.condition for use in repo.uses]
    conditions_type = dict()
    for condition in conditions:
        # print(condition.id)
        if condition.type not in conditions_type.keys():
            conditions_type[condition.type]=[condition.content]
        else:
            conditions_type[condition.type].append(condition.content)

    for types in conditions_type.keys():
        print(types, ":", conditions_type[types])


if __name__ == "__main__":
    with app.app_context():
        ext.create_all(app=app)
