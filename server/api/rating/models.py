from api.game.models import Game, Platform
from django.conf import settings
from django.db import models


class Rating(models.Model):
  user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
  rating = models.IntegerField(null=False)
  platform = models.ForeignKey(Platform, on_delete=models.CASCADE)

  def __str__(self):
        return f'{self.user_id.username} {self.game_id.name} {self.rating}'
