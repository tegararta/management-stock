from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import render, redirect
from .models import Produk, Kategori, Status
from django.contrib.auth.decorators import login_required
from .serializers import ProdukSerializer, KategoriSerializer, StatusSerializer
from django.contrib import messages


class KategoriViewSet(viewsets.ModelViewSet):
    """
    ViewSet untuk Kategori
    - GET: Public (semua bisa lihat)
    - POST, PUT, PATCH, DELETE: Hanya admin yang sudah login
    """
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class StatusViewSet(viewsets.ModelViewSet):
    """
    ViewSet untuk Status
    - GET: Public (semua bisa lihat)
    - POST, PUT, PATCH, DELETE: Hanya admin yang sudah login
    """
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class ProdukViewSet(viewsets.ModelViewSet):
    serializer_class = ProdukSerializer
    
    def get_queryset(self):
        # PASTIKAN select_related dengan 'kategori' dan 'status', bukan 'kategori_id'
        queryset = Produk.objects.select_related('kategori_id', 'status_id')
        
        # Filter
        kategori_id = self.request.query_params.get('kategori_id')
        if kategori_id:
            queryset = queryset.filter(kategori_id=kategori_id)
            
        status_id = self.request.query_params.get('status_id')
        if status_id:
            queryset = queryset.filter(status_id=status_id)
            
        return queryset
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]
    
    # Optional: Custom response format
    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        # Anda bisa modifikasi response.data di sini jika perlu
        return response

def index(request):
    return render(request, 'index.html')