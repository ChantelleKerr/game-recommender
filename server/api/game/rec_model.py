import numpy as np
from api.rating.models import Rating
from django.contrib.auth.models import User


def get_user_games_recommendations(user):
    user_ratings = Rating.objects.filter(user=user)
    all_users = User.objects.exclude(pk=user.pk)

    recommendations = get_game_recommendation_scores(user, user_ratings, all_users)

    sorted_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    top_recommendations = sorted_recommendations
    return [game for game, _ in top_recommendations]

def get_game_recommendation_scores(user, user_ratings, all_users):
    recommendations = {}
    similarity_to_other_users = {}

    for other_user in all_users:
        other_user_ratings = Rating.objects.filter(user=other_user)

        similarity = calculate_cosine_similarity(user_ratings, other_user_ratings)
        games_rated_positively = other_user_ratings.filter(rating__gte=3)
        similarity_to_other_users[other_user] = similarity


        for rating in games_rated_positively:
            if not Rating.objects.filter(user=user, game=rating.game).exists():
                if rating.game not in recommendations:
                    recommendations.setdefault(rating.game, 0)
                recommendations[rating.game] += float(similarity)

    return recommendations

def calculate_cosine_similarity(ratings_user, ratings_other):
    user_ratings_dict = {rating.game_id: rating.rating for rating in ratings_user}
    other_ratings_dict = {rating.game_id: rating.rating for rating in ratings_other}

    common_games = set(user_ratings_dict.keys()) & set(other_ratings_dict.keys())

    numerator = sum(user_ratings_dict[game] * other_ratings_dict[game] for game in common_games)
    denominator_user = sum(user_ratings_dict[game] ** 2 for game in user_ratings_dict)
    denominator_other = sum(other_ratings_dict[game] ** 2 for game in other_ratings_dict)

    similarity = numerator / (np.sqrt(denominator_user) * np.sqrt(denominator_other)) if denominator_user > 0 and denominator_other > 0 else 0
    return similarity