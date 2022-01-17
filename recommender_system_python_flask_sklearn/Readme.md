# we developed in this app 2 type of recommenders:

## 1. Simple recommenders:

offer generalized recommendations to every user, based on movie popularity and/or genre.
The basic idea behind this system is that movies that are more popular and critically acclaimed will have a higher probability of being liked by the average audience. An example could be IMDB Top 250.

# 2. Content-based recommenders:

suggest similar items based on a particular item. This system uses item metadata, such as genre, director, description, actors, etc. for movies, to make these recommendations. The general idea behind these recommender systems is that if a person likes a particular item, he or she will also like an item that is similar to it. And to recommend that, it will make use of the user's past item metadata. A good example could be YouTube, where based on your history, it suggests you new videos that you could potentially watch.

# python request :

import requests
import json

url = "http://127.0.0.1:5000/"

payload = json.dumps({
"film_name": "Jumanji"
})
headers = {
'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

### response:

{
"success": true,
"user film": "Jumanji",
"films recommended": {
"552": "The Pagemaster",
"1996": "Return to Oz",
"59": "The Indian in the Cupboard",
"902": "The Wizard of Oz",
"1047": "Aladdin and the King of Thieves",
"1168": "The Princess Bride",
"1823": "Small Soldiers",
"1870": "Labyrinth",
"1957": "Honey, I Shrunk the Kids",
"239": "Gordy"
}
}

# Datasets:

maybe actual datasets won't work properly , since I reduce theire size to a few Ko, but You can still download it from :

### https://www.kaggle.com/rounakbanik/the-movies-dataset/data

# Tutorial

### https://www.datacamp.com/community/tutorials/recommender-systems-python
