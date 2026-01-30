from django.db import models


class Kategori(models.Model):
    id_kategori = models.AutoField(primary_key=True)
    nama_kategori = models.CharField(max_length=100, unique=True)

    class Meta:
        db_table = 'kategori'
        verbose_name_plural = 'Kategori'

    def __str__(self):
        return self.nama_kategori


class Status(models.Model):
    id_status = models.AutoField(primary_key=True)
    nama_status = models.CharField(max_length=50)

    class Meta:
        db_table = 'status'
        verbose_name_plural = 'Status'

    def __str__(self):
        return self.nama_status


class Produk(models.Model):
    id_produk = models.AutoField(primary_key=True)
    nama_produk = models.CharField(max_length=200, blank=False, null=False)
    harga = models.DecimalField(max_digits=10, decimal_places=2, blank=False, null=False)
    kategori_id = models.ForeignKey(
        Kategori, 
        on_delete=models.CASCADE, 
        related_name='produk',
        db_column='kategori_id',
        blank=False,
        null=False
    )
    status_id = models.ForeignKey(
        Status, 
        on_delete=models.CASCADE, 
        related_name='produk',
        db_column='status_id',
        blank=False,
        null=False
    )

    class Meta:
        db_table = 'produk'
        verbose_name_plural = 'Produk'

    def __str__(self):
        return self.nama_produk
