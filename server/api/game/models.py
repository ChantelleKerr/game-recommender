import pandas as pd
from django.db import models


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return str(self.id) + " " + self.name

class Platform(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return str(self.id) + " " + self.name

class Game(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    platforms = models.ManyToManyField(Platform)
    genres = models.ManyToManyField(Genre)

    def __str__(self):
        return self.name
