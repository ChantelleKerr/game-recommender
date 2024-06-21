from api.game.models import Game
from api.rating.models import Rating
from api.test import BaseTestCase
from django.contrib.auth.models import User

from ..rec_model import (
    calculate_cosine_similarity,
    get_game_recommendation_scores,
    get_user_games_recommendations,
)


class RecommendationTest(BaseTestCase):

    def test_cosine_similarity(self):
        user_a = User.objects.get(username='UserA')
        user_b = User.objects.get(username='UserB')
        user_a = Rating.objects.filter(user=user_a)
        user_b = Rating.objects.filter(user=user_b)

        score = calculate_cosine_similarity(user_a, user_b)
        self.assertEqual(round(float(score),3), 0.696)


    def test_recommended_games(self):
        user_a = User.objects.get(username='UserA')
        recommended_games = get_user_games_recommendations(user_a)
        first_recommended_game = recommended_games[0].name
        second_recommended_game = recommended_games[1].name
        
        self.assertEqual(first_recommended_game, "Among Us")
        self.assertEqual(second_recommended_game, "Final Fantasy XIV")

    def test_game_scores(self):
        user_a = User.objects.get(username='UserA')
        user_ratings = Rating.objects.filter(user=user_a)
        all_users = User.objects.exclude(pk=user_a.pk)
        game_recommended_scores = get_game_recommendation_scores(user_a, user_ratings, all_users)
        recommendations_list = list(game_recommended_scores.items())
        
        game_a, score_a = recommendations_list[0]
        game_b, score_b = recommendations_list[1]
        
        self.assertAlmostEquals(score_a, 0.696, 2)
        self.assertAlmostEquals(score_b, 1.382, 2)

        self.assertEqual(game_a.name, "Final Fantasy XIV")
        self.assertEqual(game_b.name, "Among Us")