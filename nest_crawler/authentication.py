import tweepy as tw


def authenticate():
    c_k = "GEhtSyP9e98mzFeiOCSW0lvQX"
    c_s = "438cmYrl5xqaX2W7I2Bf5A9nF1pN5VtM9f77WYQnAXg1BwKJ27"
    a_t = "1380217745732689921-IW3U1JlxhnQeGBUrnHZ2nxbxhksXUZ"
    a_t_s = "EUoYNoj72rb2q00tUIW8eTcLJAhUAYPstZlV78W9cPpEJ"

    auth = tw.OAuthHandler(c_k, c_s)
    auth.set_access_token(a_t, a_t_s)
    api = tw.API(auth, wait_on_rate_limit=True)
    # client = tw.Client(b_t, c_k, c_s, a_t, a_t_s, wait_on_rate_limit=True);
    return api