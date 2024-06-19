from api.game.models import Game, Platform
from django.conf import settings
from django.db import models


class Rating(models.Model):
  id = models.AutoField(primary_key=True)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  game = models.ForeignKey(Game, on_delete=models.CASCADE)
  rating = models.DecimalField(null=False, max_digits=2, decimal_places=1)
  platform = models.ForeignKey(Platform, on_delete=models.CASCADE)

  def __str__(self):
        return f'{self.user.username} {self.game.name} {self.rating}'
