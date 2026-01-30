from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .views import ProdukViewSet, KategoriViewSet, StatusViewSet

router = DefaultRouter()
router.register(r'produk', ProdukViewSet, basename='produk')
router.register(r'kategori', KategoriViewSet, basename='kategori')
router.register(r'status', StatusViewSet, basename='status')

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return Response({'status': 'ok', 'message': 'Django backend is running'})

urlpatterns = [
    path('health/', health_check, name='health'),
    path('', include(router.urls)),
]
