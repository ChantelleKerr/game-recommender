from django.contrib.admin import site

from .models import Rating

# Register your models here.
site.register(Rating)
