# Setup Supabase untuk Halaman Pendaftaran

## 1. Buat Proyek Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Buat akun atau login
3. Klik "New Project"
4. Pilih organisasi dan isi detail proyek:
   - Name: `basketball-itb-yadika`
   - Database Password: (buat password yang kuat)
   - Region: pilih yang terdekat (Singapore untuk Indonesia)

## 2. Setup Environment Variables

Buat file `.env.local` di root project dengan isi:

```env


Untuk mendapatkan URL dan Anon Key:
1. Di dashboard Supabase, klik "Settings" → "API"
2. Copy "Project URL" dan "anon public" key

## 3. Setup Database Schema

1. Di dashboard Supabase, klik "SQL Editor"
2. Copy dan paste seluruh isi file `supabase-schema.sql`
3. Klik "Run" untuk menjalankan script

Script ini akan membuat:
- Tabel `registrations` untuk menyimpan data pendaftaran
- Storage bucket `images` dengan folder `ktm` untuk menyimpan foto KTM
- Policies untuk keamanan data
- Indexes untuk performa yang lebih baik

## 4. Setup Storage

1. Di dashboard Supabase, klik "Storage"
2. Pastikan bucket `images` sudah dibuat
3. Klik bucket tersebut dan pastikan policy sudah aktif
4. File foto KTM akan disimpan di folder `ktm` dalam bucket `images`

## 5. Install Dependencies

Jalankan command berikut untuk install Supabase client:

```bash
npm install @supabase/supabase-js
```

## 6. Test Setup

1. Jalankan development server: `npm run dev`
2. Buka halaman pendaftaran: `http://localhost:3000/register`
3. Coba isi form dan submit
4. Cek di dashboard Supabase → Table Editor → `registrations` untuk melihat data

## Struktur Database

### Tabel `registrations`
- `id`: UUID (Primary Key)
- `nama`: VARCHAR(255) - Nama lengkap
- `nim`: VARCHAR(50) - NIM (Unique)
- `foto_ktm_url`: TEXT - URL foto KTM
- `alamat_domisili`: TEXT - Alamat domisili
- `fakultas`: VARCHAR(10) - FTI atau FHB
- `program_studi`: VARCHAR(10) - Program studi
- `alasan_bergabung`: TEXT - Alasan bergabung
- `created_at`: TIMESTAMP - Waktu dibuat
- `updated_at`: TIMESTAMP - Waktu diupdate

### Storage Bucket `images`
- Menyimpan foto KTM yang diupload di folder `ktm`
- Public access untuk download
- Auto-generated unique filename
- Path: `ktm/{timestamp}-{random}.{extension}`

## Fitur yang Tersedia

1. **Form Pendaftaran Dinamis**
   - Upload foto KTM ke Supabase Storage
   - Validasi form real-time
   - Success/error handling

2. **Database Operations**
   - Insert data pendaftaran
   - Upload file ke storage
   - Get all registrations (untuk admin)

3. **Security**
   - Row Level Security (RLS) enabled
   - Public policies untuk insert dan select
   - Secure file upload

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan file `.env.local` sudah dibuat dengan benar
- Restart development server setelah menambah environment variables

### Error: "Failed to upload file"
- Pastikan storage bucket `images` sudah dibuat
- Cek storage policies sudah aktif
- Pastikan folder `ktm` dapat diakses

### Error: "Failed to insert data"
- Pastikan tabel `registrations` sudah dibuat
- Cek RLS policies sudah benar

## Next Steps

Setelah setup selesai, Anda bisa:
1. Membuat halaman admin untuk melihat pendaftaran
2. Menambahkan email notification
3. Membuat dashboard statistik
4. Menambahkan fitur approval/rejection
