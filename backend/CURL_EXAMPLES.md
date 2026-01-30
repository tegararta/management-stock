# API Endpoints - cURL Examples

Base URL: `http://localhost:8000`

## 1. Health Check

### GET Health Check
```bash
curl -X GET http://localhost:8000/api/health/
```

---

## 2. Produk Endpoints

### GET List All Produk
```bash
curl -X GET http://localhost:8000/api/produk/
```

### GET Produk dengan Filter (kategori_id)
```bash
curl -X GET "http://localhost:8000/api/produk/?kategori_id=1"
```

### GET Produk dengan Filter (status_id)
```bash
curl -X GET "http://localhost:8000/api/produk/?status_id=1"
```

### GET Produk dengan Filter (kategori_id & status_id)
```bash
curl -X GET "http://localhost:8000/api/produk/?kategori_id=1&status_id=1"
```

### GET Detail Produk by ID
```bash
curl -X GET http://localhost:8000/api/produk/1/
```

### POST Create Produk Baru
```bash
curl -X POST http://localhost:8000/api/produk/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Laptop ASUS",
    "harga": "15000000",
    "kategori_id": 1,
    "status_id": 1
  }'
```

### PUT Update Produk (Full Update)
```bash
curl -X PUT http://localhost:8000/api/produk/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Laptop ASUS Updated",
    "harga": "16000000",
    "kategori_id": 1,
    "status_id": 1
  }'
```

### PATCH Partial Update Produk
```bash
curl -X PATCH http://localhost:8000/api/produk/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "harga": "17000000"
  }'
```

### DELETE Produk
```bash
curl -X DELETE http://localhost:8000/api/produk/1/
```

---

## 3. Kategori Endpoints

### GET List All Kategori
```bash
curl -X GET http://localhost:8000/api/kategori/
```

### GET Detail Kategori by ID
```bash
curl -X GET http://localhost:8000/api/kategori/1/
```

### POST Create Kategori Baru
```bash
curl -X POST http://localhost:8000/api/kategori/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik"
  }'
```

### PUT Update Kategori (Full Update)
```bash
curl -X PUT http://localhost:8000/api/kategori/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik Updated"
  }'
```

### PATCH Partial Update Kategori
```bash
curl -X PATCH http://localhost:8000/api/kategori/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik Baru"
  }'
```

### DELETE Kategori
```bash
curl -X DELETE http://localhost:8000/api/kategori/1/
```

---

## 4. Status Endpoints

### GET List All Status
```bash
curl -X GET http://localhost:8000/api/status/
```

### GET Detail Status by ID
```bash
curl -X GET http://localhost:8000/api/status/1/
```

### POST Create Status Baru

####  2 opsi pilihan 

```bash
curl -X POST http://localhost:8000/api/status/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_status": "bisa dijual"
  }'
```

### PUT Update Status (Full Update)
```bash
curl -X PUT http://localhost:8000/api/status/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_status": "tidak bisa dijual"
  }'
```

### PATCH Partial Update Status
```bash
curl -X PATCH http://localhost:8000/api/status/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_status": "Aktif Lagi"
  }'
```

### DELETE Status
```bash
curl -X DELETE http://localhost:8000/api/status/1/
```

---

## Contoh Testing Flow Lengkap

### 1. Buat Kategori terlebih dahulu
```bash
curl -X POST http://localhost:8000/api/kategori/ \
  -H "Content-Type: application/json" \
  -d '{"nama_kategori": "Elektronik"}'
```

### 2. Buat Status
```bash
curl -X POST http://localhost:8000/api/status/ \
  -H "Content-Type: application/json" \
  -d '{"nama_status": "Aktif"}'
```

### 3. Buat Produk dengan kategori_id dan status_id yang sudah dibuat
```bash
curl -X POST http://localhost:8000/api/produk/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Laptop ASUS",
    "harga": "15000000",
    "kategori_id": 1,
    "status_id": 1
  }'
```

### 4. List semua produk
```bash
curl -X GET http://localhost:8000/api/produk/
```

### 5. Update produk
```bash
curl -X PUT http://localhost:8000/api/produk/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Laptop ASUS ROG",
    "harga": "20000000",
    "kategori_id": 1,
    "status_id": 1
  }'
```

---

## Catatan Validasi

### Error jika nama_produk kosong:
```bash
curl -X POST http://localhost:8000/api/produk/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "",
    "harga": "15000000",
    "kategori_id": 1,
    "status_id": 1
  }'
```

**Response:**
```json
{
  "nama_produk": ["Nama produk harus diisi"]
}
```

### Error jika harga bukan angka:
```bash
curl -X POST http://localhost:8000/api/produk/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Laptop",
    "harga": "bukan angka",
    "kategori_id": 1,
    "status_id": 1
  }'
```

**Response:**
```json
{
  "harga": ["Harga harus berupa angka"]
}
```

### Error jika harga <= 0:
```bash
curl -X POST http://localhost:8000/api/produk/ \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Laptop",
    "harga": "-1000",
    "kategori_id": 1,
    "status_id": 1
  }'
```

**Response:**
```json
{
  "harga": ["Harga harus lebih besar dari 0"]
}
```
