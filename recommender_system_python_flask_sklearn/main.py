# https://www.datacamp.com/community/tutorials/recommender-systems-python
# Import Pandas
import json
from flask import request
from flask import Flask
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
from ast import literal_eval
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd


# Load Movies Metadata
metadata = pd.read_csv('./movies_metadata.min.csv', low_memory=True)

# # Print the first three rows
# print(metadata.head(3))
# # just for test

metadata = metadata.head(2000)

print("metadata.head()")
print(metadata.head())
# ///////////////////////////////
# ! Simple Recommender
# Calculate mean of vote average column
C = metadata['vote_average'].mean()

# Calculate the minimum number of votes required to be in the chart, 90th percentile
m = metadata['vote_count'].quantile(0.90)

# Filter out all qualified movies into a new DataFrame [get films of 10% ]
q_movies = metadata.copy().loc[metadata['vote_count'] >= m]
# print(q_movies.shape)

# Function that computes the weighted rating of each movie


def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['vote_average']
    # Calculation based on the IMDB formula
    return (v/(v+m) * R) + (m/(m+v) * C)


# Define a new feature 'score' and calculate its value with `weighted_rating()`
q_movies['score'] = q_movies.apply(weighted_rating, axis=1)


# Sort movies based on score calculated above
q_movies = q_movies.sort_values('score', ascending=False)

tfidf = TfidfVectorizer(stop_words='english')

# Replace NaN with an empty string
metadata['overview'] = metadata['overview'].fillna('')

# Construct the required TF-IDF matrix by fitting and transforming the data
tfidf_matrix = tfidf.fit_transform(metadata['overview'])

# Output the shape of tfidf_matrix
# print(tfidf_matrix.shape)


# Array mapping from feature integer indices to feature name.
# print(tfidf.get_feature_names_out()[5000:5010])


# Import linear_kernel

# Compute the cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
# print(cosine_sim.shape)


# Construct a reverse map of indices and movie titles
indices = pd.Series(metadata.index, index=metadata['title']).drop_duplicates()

# print(indices[:10])


# Print the new features of the first 3 films
# print(metadata[['title', 'cast', 'director', 'keywords', 'genres']].head(3))


# Function that takes in movie title as input and outputs most similar movies
def get_recommendations(title, cosine_sim=cosine_sim):
    # Get the index of the movie that matches the title
    idx = indices[title]

    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:11]
    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies
    return metadata['title'].iloc[movie_indices]
# Function to convert all strings to lower case and strip names of spaces


def create_soup(x):
    return ' '.join(x['keywords']) + ' ' + ' '.join(x['cast']) + ' ' + x['director'] + ' ' + ' '.join(x['genres'])


def get_director(x):
    for i in x:
        if i['job'] == 'Director':
            return i['name']
    return np.nan


def get_list(x):
    if isinstance(x, list):
        names = [i['name'] for i in x]
        # Check if more than 3 elements exist. If yes, return only first three. If no, return entire list.
        if len(names) > 3:
            names = names[:3]
        return names

    # Return empty list in case of missing/malformed data
    return []


def clean_data(x):
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    else:
        # Check if director exists. If not, return empty string
        if isinstance(x, str):
            return str.lower(x.replace(" ", ""))
        else:
            return ''


# Print the top 15 movies
# TODO: Route Here
print(q_movies[['title', 'vote_count', 'vote_average', 'score']].head(15))

# Print plot overviews of the first 5 movies.
# print(metadata['overview'].head())


# Import TfIdfVectorizer from scikit-learn

# Define a TF-IDF Vectorizer Object. Remove all english stop words such as 'the', 'a'


print(get_recommendations('Toy Story', cosine_sim))


# Load keywords and credits
credits = pd.read_csv('credits.csv')
keywords = pd.read_csv('keywords.csv')

# Remove rows with bad IDs.\
# Already eliminated
# metadata = metadata.drop([19730])

# Convert IDs to int. Required for merging
keywords['id'] = keywords['id'].astype('int')
credits['id'] = credits['id'].astype('int')
metadata['id'] = metadata['id'].astype('int')

# Merge keywords and credits into your main metadata dataframe
metadata = metadata.merge(credits, on='id')
metadata = metadata.merge(keywords, on='id')

# Print the first two movies of your newly merged metadata
# print(metadata.head(2))
# Parse the stringified features into their corresponding python objects

features = ['cast', 'crew', 'keywords', 'genres']
for feature in features:
    metadata[feature] = metadata[feature].apply(literal_eval)

# Define new director, cast, genres and keywords features that are in a suitable form.
metadata['director'] = metadata['crew'].apply(get_director)

features = ['cast', 'keywords', 'genres']
for feature in features:
    metadata[feature] = metadata[feature].apply(get_list)


# Apply clean_data function to your features.
features = ['cast', 'keywords', 'director', 'genres']

for feature in features:
    metadata[feature] = metadata[feature].apply(clean_data)

print("\n\n\n\n\nALL FILMS\n\n\n\n\n")
print(metadata['title'])
print("\n\n\n\n\nALL FILMS\n\n\n\n\n")

# Create a new soup feature
metadata['soup'] = metadata.apply(create_soup, axis=1)

# print(metadata[['soup']].head(2))

# Import CountVectorizer and create the count matrix

count = CountVectorizer(stop_words='english')
count_matrix = count.fit_transform(metadata['soup'])

# Compute the Cosine Similarity matrix based on the count_matrix

cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

# Reset index of your main DataFrame and construct reverse mapping as before
metadata = metadata.reset_index()
indices = pd.Series(metadata.index, index=metadata['title'])
print("\n\n\n\n\nAfter Adding KeyWords\n\n\n\n\n")
print(get_recommendations('Toy Story', cosine_sim2))
print("get_recommendations('Jumanji', cosine_sim2)")
print(get_recommendations('Jumanji', cosine_sim2))


app = Flask(__name__)


@app.route("/",  methods=['POST'])
def hello():
    print(request.get_json()["film_name"])
    userFilm = request.get_json()["film_name"]
    print(
        f"data \t {request.data} {type(get_recommendations(userFilm, cosine_sim2))}")

    return json.dumps({'success': True, "user film": userFilm,
                    "films recommended": json.loads(get_recommendations(userFilm, cosine_sim2).to_json())}), 200, {'ContentType': 'application/json'}


if __name__ == "__main__":
    app.run()
