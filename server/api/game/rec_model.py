import numpy as np
from api.rating.models import Rating
from django.contrib.auth.models import User


def get_user_recommendation(user):
    user_ratings = Rating.objects.filter(user=user)
    all_users = User.objects.exclude(pk=user.pk)

    recommendations = {}

    for other_user in all_users:
        other_user_ratings = Rating.objects.filter(user=other_user)

        similarity = calculate_cosine_similarity(user_ratings, other_user_ratings)
        games_rated_positively = other_user_ratings.filter(rating__gt=3)


        for rating in games_rated_positively:
            if not Rating.objects.filter(user=user, game=rating.game).exists():
                recommendations.setdefault(rating.game, 0)
                recommendations[rating.game] += similarity

    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    top_recommendations = sorted_recommendations
    print(top_recommendations)
    return [game for game, _ in top_recommendations]

def calculate_cosine_similarity(ratings_user, ratings_other):
    user_ratings_dict = {rating.game_id: rating.rating for rating in ratings_user}
    other_ratings_dict = {rating.game_id: rating.rating for rating in ratings_other}

    common_games = set(user_ratings_dict.keys()) & set(other_ratings_dict.keys())

    numerator = sum(user_ratings_dict[game] * other_ratings_dict[game] for game in common_games)
    denominator_user = sum(user_ratings_dict[game] ** 2 for game in user_ratings_dict)
    denominator_other = sum(other_ratings_dict[game] ** 2 for game in other_ratings_dict)

    similarity = numerator / (np.sqrt(denominator_user) * np.sqrt(denominator_other)) if denominator_user > 0 and denominator_other > 0 else 0

    return similarity