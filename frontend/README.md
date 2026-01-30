# Admin Panel - Manajemen Produk

Admin panel sederhana untuk mengelola produk, kategori, dan status menggunakan Next.js 16 dan Tailwind CSS.

## Fitur

✨ **Halaman Public**
- Tampilan katalog produk untuk pengunjung (tanpa login)
- Filter berdasarkan kategori dan status
- Responsive design

🔐 **Halaman Admin**
- Login dengan JWT authentication
- Dashboard dengan statistik
- CRUD Produk, Kategori, dan Status
- Protected routes

## Tech Stack

- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **JWT** - Authentication

## Prerequisites

- Node.js 18+ atau npm
- Backend API berjalan di `http://localhost:8000`

## Instalasi

1. **Install dependencies**
```bash
npm install
```

2. **Setup environment variables**

File `.env.local` sudah dibuat dengan konfigurasi default:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Jika backend API Anda berjalan di URL yang berbeda, silakan sesuaikan.

3. **Jalankan development server**
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Project

```
admin-panel/
├── app/
│   ├── page.tsx                 # Halaman public (katalog produk)
│   ├── login/
│   │   └── page.tsx            # Halaman login
│   ├── admin/
│   │   ├── layout.tsx          # Layout admin (protected)
│   │   ├── page.tsx            # Dashboard admin
│   │   ├── produk/
│   │   │   └── page.tsx        # Manajemen produk
│   │   ├── kategori/
│   │   │   └── page.tsx        # Manajemen kategori
│   │   └── status/
│   │       └── page.tsx        # Manajemen status
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── lib/
│   └── api.ts                  # API client & type definitions
└── package.json
```
### Penjelasan Direktori dan File
- **`app/`**: Direktori utama untuk halaman dan layout aplikasi.
  - `globals.css`: File CSS global untuk styling aplikasi.
  - `layout.tsx`: Layout utama aplikasi.
  - `page.tsx`: Halaman utama aplikasi.
  - **`admin/`**: Subdirektori untuk halaman admin.
    - `layout.tsx`: Layout untuk halaman admin.
    - `page.tsx`: Halaman utama admin.
    - **`kategori/`**: Halaman untuk kategori.
    - **`produk/`**: Halaman untuk produk.
    - **`status/`**: Halaman untuk status.
  - **`login/`**: Halaman untuk login.
- **`lib/`**: Direktori untuk logika dan utilitas.
  - `api.ts`: File untuk pengaturan API.
  - `types.ts`: File untuk tipe data TypeScript.
- **`public/`**: Direktori untuk aset publik seperti gambar dan ikon.
- **`tsconfig.json`**: Konfigurasi TypeScript.
- **`eslint.config.mjs`**: Konfigurasi ESLint untuk linting kode.
- **`postcss.config.mjs`**: Konfigurasi PostCSS untuk pengolahan CSS.
- **`next.config.ts`**: Konfigurasi Next.js.
- **`package.json`**: File konfigurasi npm untuk dependensi proyek.

## Penggunaan

### 1. Akses Halaman Public

Buka `http://localhost:3000` untuk melihat katalog produk (tidak perlu login).

### 2. Login ke Admin Panel

1. Klik tombol "Login Admin" di halaman utama
2. Gunakan credentials dari backend Anda (default: `admin` / `password123`)
3. Setelah login, Anda akan diarahkan ke dashboard admin

### 3. Manajemen Data

**Dashboard** (`/admin`)
- Lihat statistik total produk, kategori, dan status
- Quick actions untuk menambah data

**Kategori** (`/admin/kategori`)
- Tambah, edit, hapus kategori
- Contoh: Elektronik, Pakaian, Makanan

**Status** (`/admin/status`)
- Tambah, edit, hapus status
- Contoh: bisa dijual, tidak bisa dijual

**Produk** (`/admin/produk`)
- Tambah, edit, hapus produk
- Setiap produk harus memiliki kategori dan status

## API Integration

Aplikasi ini menggunakan endpoint berikut dari backend:

**Authentication:**
- `POST /api/auth/login/` - Login
- `GET /api/auth/me/` - Get current user
- `POST /api/auth/logout/` - Logout

**Public Endpoints (GET):**
- `GET /api/kategori/` - List kategori
- `GET /api/status/` - List status
- `GET /api/produk/` - List produk

**Protected Endpoints (POST/PUT/DELETE):**
- `POST /api/kategori/` - Create kategori
- `PUT /api/kategori/{id}/` - Update kategori
- `DELETE /api/kategori/{id}/` - Delete kategori
- (Similar untuk status dan produk)

## Authentication Flow

1. User login → Receive access & refresh tokens
2. Tokens disimpan di `localStorage`
3. Setiap request ke protected endpoint mengirim `Authorization: Bearer <token>`
4. Jika token expired, user akan di-redirect ke halaman login

## Build untuk Production

```bash
npm run build
npm start
```

## Customization

### Mengubah warna tema
Edit `tailwind.config.js` dan sesuaikan theme colors.

### Mengubah API URL
Edit `.env.local` dan sesuaikan `NEXT_PUBLIC_API_URL`.

### Menambah field baru
1. Update interface di `lib/api.ts`
2. Update form di halaman yang relevan
3. Update API calls

## Troubleshooting

**Error: Cannot connect to backend**
- Pastikan backend API berjalan di `http://localhost:8000`
- Check environment variable `NEXT_PUBLIC_API_URL`

**Error: Authentication failed**
- Pastikan credentials benar
- Check apakah backend menggunakan JWT authentication
- Clear localStorage dan coba login ulang

**CORS Error**
- Pastikan backend mengizinkan origin `http://localhost:3000`
- Check CORS settings di Django

## Tips

1. **Urutan membuat data:**
   - Buat kategori terlebih dahulu
   - Buat status terlebih dahulu
   - Baru buat produk (yang memerlukan kategori dan status)

2. **Token expiry:**
   - Access token expired setelah 1 jam
   - Refresh token expired setelah 7 hari
   - Jika expired, login ulang

3. **Testing:**
   - Gunakan browser DevTools untuk debug
   - Check Network tab untuk melihat API requests
   - Check Console untuk error messages

## License
- ggwp