# API Authentication Documentation

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run migrations:
```bash
python manage.py migrate
```

3. Create superuser (untuk admin):
```bash
python manage.py createsuperuser
```

## Authentication Endpoints

### 1. Login

**POST** `/api/auth/login/`

Request body:
```json
{
  "username": "admin",
  "password": "password123"
}
```

Response (Success):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "first_name": "",
    "last_name": "",
    "is_staff": true
  }
}
```

Response (Error):
```json
{
  "error": "Username atau password salah"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

---

### 2. Get Current User Info

**GET** `/api/auth/me/`

Headers:
```
Authorization: Bearer <access_token>
```

Response:
```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "first_name": "",
  "last_name": "",
  "is_staff": true
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8000/api/auth/me/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

### 3. Logout

**POST** `/api/auth/logout/`

Headers:
```
Authorization: Bearer <access_token>
```

Request body:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

Response:
```json
{
  "message": "Logout berhasil"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8000/api/auth/logout/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "refresh": "YOUR_REFRESH_TOKEN"
  }'
```

---

## Protected Endpoints (Require Authentication)

Semua endpoint berikut memerlukan **Bearer Token** di header:

```
Authorization: Bearer <access_token>
```

### Admin Endpoints (POST, PUT, PATCH, DELETE)

- `POST /api/kategori/` - Buat kategori baru
- `PUT /api/kategori/{id}/` - Update kategori
- `PATCH /api/kategori/{id}/` - Partial update kategori
- `DELETE /api/kategori/{id}/` - Hapus kategori

- `POST /api/status/` - Buat status baru
- `PUT /api/status/{id}/` - Update status
- `PATCH /api/status/{id}/` - Partial update status
- `DELETE /api/status/{id}/` - Hapus status

- `POST /api/produk/` - Buat produk baru
- `PUT /api/produk/{id}/` - Update produk
- `PATCH /api/produk/{id}/` - Partial update produk
- `DELETE /api/produk/{id}/` - Hapus produk

### Public Endpoints (GET - No Authentication Required)

- `GET /api/kategori/` - List semua kategori
- `GET /api/kategori/{id}/` - Detail kategori
- `GET /api/status/` - List semua status
- `GET /api/status/{id}/` - Detail status
- `GET /api/produk/` - List semua produk
- `GET /api/produk/{id}/` - Detail produk

---

## Example Flow: Create Produk (Admin)

### 1. Login untuk mendapatkan token
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

Response akan memberikan `access` token. Simpan token ini.

### 2. Buat Kategori (jika belum ada)
```bash
curl -X POST http://localhost:8000/api/kategori/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik"
  }'
```

### 3. Buat Status (jika belum ada)
```bash
curl -X POST http://localhost:8000/api/status/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_status": "bisa dijual"
  }'
```

### 4. Buat Produk
```bash
curl -X POST http://localhost:8000/api/produk/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Laptop ASUS",
    "harga": "15000000",
    "kategori_id": 1,
    "status_id": 1
  }'
```

---

## Token Lifetime

- **Access Token**: 1 jam (untuk API calls)
- **Refresh Token**: 7 hari (untuk mendapatkan access token baru)

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

---

## Next.js Integration Tips

1. Simpan `access_token` dan `refresh_token` di localStorage atau cookie setelah login
2. Setiap request ke protected endpoints, tambahkan header:
   ```javascript
   headers: {
     'Authorization': `Bearer ${accessToken}`
   }
   ```
3. Jika access token expired (401), gunakan refresh token untuk mendapatkan access token baru
4. Implement auto-logout jika refresh token juga expired
