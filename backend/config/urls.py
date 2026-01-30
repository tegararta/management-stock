"""
URL configuration for config project.
"""
from django.contrib import admin
from django.urls import path, include
from api.produk import views as produk_views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Public Frontend
    path('', produk_views.index, name='index'),
    
    # API Endpoints
    path('api/auth/', include('api.auth.urls')),
    path('api/', include('api.produk.urls')),
]
