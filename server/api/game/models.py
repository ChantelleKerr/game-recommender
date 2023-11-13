from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=200)

class Platform(models.Model):
    name = models.CharField(max_length=200)

class Game(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    platforms = models.ManyToManyField(Platform)
    genres = models.ManyToManyField(Genre)
