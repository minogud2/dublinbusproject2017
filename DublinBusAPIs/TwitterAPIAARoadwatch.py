# >> This program gets the twitter feed from AARoadwatch. <<

import requests
from requests_oauthlib import OAuth1

# The first 6 lines are all about the url and authentication credentials.
base_url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=aaroadwatch&count=100'
CONSUMER_KEY = 'wJx7TMGnDB5glAeRVZeMeqBCi'
CONSUMER_SECRET = 'Iri0sl7eg1lDGFHViCAdC2XcuhgUXaERRzSX1EdunQOvVLnkkg'
ACCESS_TOKEN_KEY = '876448778223579137-PMiTnrAgI5BQE7swQ0851A3SxyWQNWk'
ACCESS_TOKEN_SECRET = 'qTQafqyMIbmpqpPj639wU8m0k564RCKPmeEpJW6OFz7NA'
auth = OAuth1(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN_KEY, ACCESS_TOKEN_SECRET)

# Makes the call to the API
response = requests.get(base_url, auth=auth)
results = response.json()
print(results)

# Iterates over the results and filters out what (seemed to me) useful.
for i in results:
    if 'DUBLIN' in i['text'] or 'Luas' in i['text']:
        print('Date:', i['created_at'])
        print('Tweet:', i['text'])
