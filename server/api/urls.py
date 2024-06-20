from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('api.auth.urls')),
    path('api/game/', include('api.game.urls')),
    path('api/rating/', include('api.rating.urls'))
]
