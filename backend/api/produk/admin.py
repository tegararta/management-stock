from django.contrib import admin
from .models import Produk, Kategori, Status


@admin.register(Kategori)
class KategoriAdmin(admin.ModelAdmin):
    list_display = ['id_kategori', 'nama_kategori']
    search_fields = ['nama_kategori']


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ['id_status', 'nama_status']
    search_fields = ['nama_status']


@admin.register(Produk)
class ProdukAdmin(admin.ModelAdmin):
    list_display = ['id_produk', 'nama_produk', 'harga', 'kategori_id', 'status_id']
    list_filter = ['kategori_id', 'status_id']
    search_fields = ['nama_produk']
    list_editable = ['harga']
