from rest_framework import serializers
from .models import Produk, Kategori, Status


class KategoriSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kategori
        fields = ['id_kategori', 'nama_kategori']


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ['id_status', 'nama_status']


class ProdukSerializer(serializers.ModelSerializer):
    kategori = serializers.StringRelatedField(source='kategori_id', read_only=True)
    status = serializers.StringRelatedField(source='status_id', read_only=True)
    kategori_id = serializers.PrimaryKeyRelatedField(
        queryset=Kategori.objects.all(), 
        write_only=True
    )
    status_id = serializers.PrimaryKeyRelatedField(
        queryset=Status.objects.all(), 
        write_only=True
    )
    
    # Validasi field nama_produk
    nama_produk = serializers.CharField(
        required=True,
        allow_blank=False,
        error_messages={
            'required': 'Nama produk harus diisi',
            'blank': 'Nama produk tidak boleh kosong'
        }
    )
    
    # Validasi field harga
    harga = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        required=True,
        error_messages={
            'required': 'Harga harus diisi',
            'invalid': 'Harga harus berupa angka',
            'max_digits': 'Harga terlalu besar (maksimal 10 digit)',
            'max_decimal_places': 'Harga maksimal 2 angka di belakang koma'
        }
    )

    class Meta:
        model = Produk
        fields = ['id_produk', 'nama_produk', 'harga', 'kategori', 'status', 'kategori_id', 'status_id']
        extra_kwargs = {
            'nama_produk': {'required': True},
            'harga': {'required': True},
        }
    
    def validate_nama_produk(self, value):
        """Validasi nama produk tidak boleh kosong setelah strip"""
        if not value or not value.strip():
            raise serializers.ValidationError("Nama produk harus diisi")
        return value.strip()
    
    def validate_harga(self, value):
        """Validasi harga harus positif"""
        if value is None:
            raise serializers.ValidationError("Harga harus diisi")
        if value <= 0:
            raise serializers.ValidationError("Harga harus lebih besar dari 0")
        return value
