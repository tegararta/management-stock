# Backend Stock Toko 🏪

Backend API untuk sistem manajemen stok toko yang dibangun dengan Django REST Framework. Mendukung manajemen produk, kategori, dan status dengan autentikasi JWT.

## 🚀 Tech Stack

- **Framework**: Django 4.2+
- **API**: Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT (Simple JWT)
- **CORS**: Django CORS Headers
- **Language**: Python 3.x

## 📋 Fitur Utama

- ✅ Autentikasi dengan JWT (Access & Refresh Token)
- ✅ CRUD Produk dengan kategori dan status
- ✅ Manajemen Kategori
- ✅ Manajemen Status Produk
- ✅ Permission-based access (Admin & Public)
- ✅ CORS enabled untuk frontend integration
- ✅ Pagination otomatis (20 items per page)

## 📁 Struktur Proyek

```
BACKEND/
├── api/
│   ├── auth/              # Modul autentikasi
│   │   ├── views.py       # Login, logout, user info
│   │   ├── urls.py        # Auth endpoints
│   │   └── serializers.py # User serializer
│   └── produk/            # Modul produk
│       ├── models.py      # Kategori, Status, Produk
│       ├── views.py       # CRUD operations
│       ├── urls.py        # Produk endpoints
│       ├── serializers.py # Data serialization
│       └── admin.py       # Django admin config
├── config/
│   ├── settings.py        # Django settings
│   ├── urls.py            # Main URL config
│   └── wsgi.py            # WSGI config
├── static/                # Static files
├── requirements.txt       # Dependencies
└── manage.py              # Django management
```

## 🛠️ Setup & Installation

### 1. Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

### 2. Clone Repository

```bash
git clone <repository-url>
cd backend
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Database Setup

Buat database PostgreSQL:

```sql
CREATE DATABASE db_stock;
CREATE USER postgres WITH PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE db_stock TO postgres;
```

Update konfigurasi database di `config/settings.py` jika perlu:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'db_stock',
        'USER': 'postgres',
        'PASSWORD': '1234',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
```

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Create Superuser

```bash
python manage.py createsuperuser
```

Ikuti prompt untuk membuat akun admin.

### 7. Run Development Server

```bash
python manage.py runserver
```

Server akan berjalan di `http://localhost:8000`

## 🔐 Authentication

API menggunakan JWT (JSON Web Token) untuk autentikasi.

### Login

**Endpoint**: `POST /api/auth/login/`

```json
// Request
{
  "username": "admin",
  "password": "password123"
}

// Response
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "is_staff": true
  }
}
```

### Get Current User

**Endpoint**: `GET /api/auth/me/`

**Headers**: `Authorization: Bearer <access_token>`

### Logout

**Endpoint**: `POST /api/auth/logout/`

**Headers**: `Authorization: Bearer <access_token>`

```json
// Request
{
  "refresh": "your_refresh_token_here"
}
```

### Token Lifetime

- **Access Token**: 1 jam
- **Refresh Token**: 7 hari

## 📡 API Endpoints

### 🔓 Public Endpoints (Tidak perlu autentikasi)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/kategori/` | List semua kategori |
| GET | `/api/kategori/{id}/` | Detail kategori |
| GET | `/api/status/` | List semua status |
| GET | `/api/status/{id}/` | Detail status |
| GET | `/api/produk/` | List semua produk |
| GET | `/api/produk/{id}/` | Detail produk |

### 🔒 Protected Endpoints (Perlu autentikasi Admin)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/kategori/` | Buat kategori baru |
| PUT | `/api/kategori/{id}/` | Update kategori |
| PATCH | `/api/kategori/{id}/` | Partial update kategori |
| DELETE | `/api/kategori/{id}/` | Hapus kategori |
| POST | `/api/status/` | Buat status baru |
| PUT | `/api/status/{id}/` | Update status |
| PATCH | `/api/status/{id}/` | Partial update status |
| DELETE | `/api/status/{id}/` | Hapus status |
| POST | `/api/produk/` | Buat produk baru |
| PUT | `/api/produk/{id}/` | Update produk |
| PATCH | `/api/produk/{id}/` | Partial update produk |
| DELETE | `/api/produk/{id}/` | Hapus produk |

## 📝 Contoh Penggunaan

### 1. Membuat Kategori

```bash
curl -X POST http://localhost:8000/api/kategori/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik"
  }'
```

### 2. Membuat Status

```bash
curl -X POST http://localhost:8000/api/status/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_status": "Tersedia"
  }'
```

### 3. Membuat Produk

```bash
curl -X POST http://localhost:8000/api/produk/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Laptop ASUS ROG",
    "harga": "15000000",
    "kategori_id": 1,
    "status_id": 1
  }'
```

### 4. Get List Produk (Public)

```bash
curl -X GET http://localhost:8000/api/produk/
```

## 🔧 Configuration

### CORS Settings

Frontend yang diizinkan (edit di `config/settings.py`):

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",    # React/Next.js
    "http://localhost:5173",    # Vite
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]
```

### JWT Settings

```python
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

## 🌐 Integrasi dengan Frontend (Next.js/React)

### 1. Login & Simpan Token

```javascript
// Login function
const login = async (username, password) => {
  const response = await fetch('http://localhost:8000/api/auth/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  
  // Simpan token
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  
  return data;
};
```

### 2. Request dengan Authentication

```javascript
// Fetch dengan token
const fetchProduk = async () => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch('http://localhost:8000/api/produk/', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
};
```

### 3. Create/Update dengan Authentication

```javascript
// Buat produk baru
const createProduk = async (produkData) => {
  const token = localStorage.getItem('access_token');
  
  const response = await fetch('http://localhost:8000/api/produk/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(produkData),
  });
  
  return await response.json();
};
```

## ⚠️ Error Handling

### Common Error Responses

#### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```
**Solusi**: Pastikan mengirim Bearer token di header

#### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```
**Solusi**: Hanya admin yang bisa melakukan POST/PUT/DELETE

#### 400 Bad Request
```json
{
  "field_name": ["Error message"]
}
```
**Solusi**: Periksa format data yang dikirim

## 🧪 Testing

### Test dengan cURL

```bash
# Test login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'

# Test get produk (public)
curl -X GET http://localhost:8000/api/produk/

# Test create produk (authenticated)
curl -X POST http://localhost:8000/api/produk/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"nama_produk": "Test", "harga": "10000", "kategori_id": 1, "status_id": 1}'
```

## 📦 Dependencies

```
Django>=4.2.0
djangorestframework>=3.14.0
django-cors-headers>=4.3.0
djangorestframework-simplejwt>=5.3.0
requests
python-dotenv
psycopg2-binary
```

## 🔒 Security Notes

### Untuk Production

1. **SECRET_KEY**: Ganti secret key di `settings.py`
   ```python
   SECRET_KEY = 'your-secret-key-here'
   ```

2. **DEBUG**: Set DEBUG ke False
   ```python
   DEBUG = False
   ```

3. **ALLOWED_HOSTS**: Tambahkan domain production
   ```python
   ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
   ```

4. **Database**: Gunakan environment variables
   ```python
   import os
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': os.getenv('DB_NAME'),
           'USER': os.getenv('DB_USER'),
           'PASSWORD': os.getenv('DB_PASSWORD'),
           'HOST': os.getenv('DB_HOST'),
           'PORT': os.getenv('DB_PORT'),
       }
   }
   ```

5. **CORS**: Batasi origin yang diizinkan
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://yourdomain.com",
   ]
   ```

## 🐛 Troubleshooting

### Database Connection Error

```
django.db.utils.OperationalError: could not connect to server
```

**Solusi**:
- Pastikan PostgreSQL running
- Cek credentials database di settings.py
- Cek port PostgreSQL (default: 5432)

### CORS Error di Browser

```
Access to fetch has been blocked by CORS policy
```

**Solusi**:
- Tambahkan origin frontend ke `CORS_ALLOWED_ORIGINS`
- Pastikan `django-cors-headers` terinstall
- Restart Django server

### Token Expired

```
{"detail": "Token is invalid or expired"}
```

**Solusi**:
- Gunakan refresh token untuk mendapatkan access token baru
- Implement auto-refresh di frontend

## 📚 Dokumentasi Lengkap

Untuk dokumentasi API yang lebih detail, lihat file `AUTH_API.md` yang sudah tersedia di repository.

