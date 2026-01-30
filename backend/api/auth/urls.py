from django.urls import path
from .views import login, me, logout

urlpatterns = [
    # API endpoints
    path('login/', login, name='api_login'),
    path('me/', me, name='api_me'),
    path('logout/', logout, name='api_logout'),
]
