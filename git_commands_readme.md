🌿 Strategi Percabangan Git - SMP Diponegoro Sampang

Dokumen ini berisi panduan alur kerja (workflow) percabangan Git yang terstruktur untuk proyek

Sistem Informasi SMP Diponegoro Sampang. Penerapan pola ini menjamin kerapian kode,

memudahkan kolaborasi tim, dan meminimalkan risiko kerusakan kode di server produksi (main

branch).

🗺 Visualisasi Arsitektur Cabang (Git Architecture)

\[ main / production ]  🟢 (Rilis Stabil - Siap Diakses Publik)

▲

│

&#x20;(Pull Request \& Code Review)

\[ development ]        



&#x20;(Integrasi Fitur Sebelum Rilis)

▲

├────────────────────────┬────────────────────────┐

│

&#x20;                       

│

&#x20;                       

│

\[ feature/ui-login ]     \[ feature/backend-api ]   \[ docs/guide ]

🔵 (Desain UI Transparan) 🔵 (Google Apps Script)  🔵 (Panduan \& Readme)

📋 Deskripsi Fungsi Cabang:

1\. main : Cabang utama yang berisi kode stabil dan siap pakai di produksi. Kode di sini tidak boleh

dimodifikasi secara langsung.

2\. development : Cabang integrasi tempat menggabungkan semua fitur baru yang telah diuji

sebelum dirilis ke main .

3\. feature/ui-login : Cabang khusus untuk pengembangan tampilan antarmuka (portal login

dinamis, dashboard responsif, footer medsos).

4\. feature/backend-api : Cabang khusus untuk mengelola kode integrasi database, Apps Script

( Code.gs ), dan konfigurasi API.

5\. docs/guide : Cabang untuk dokumentasi, berkas README, panduan CORS, dan aset

instruksional.

🚀 Panduan Inisialisasi Lokal (Langkah demi Langkah)

Jika Anda ingin membuat struktur repositori ini secara manual menggunakan Command Line /

Terminal, ikuti urutan perintah di bawah ini:

1\. Inisialisasi Repositori

Buka terminal di direktori proyek Anda, lalu jalankan:

\# Inisialisasi git lokal

git init

\# Mengatur nama cabang utama menjadi 'main' (standar GitHub)

git checkout -b main

2\. Hubungkan ke GitHub Anda

Buat repositori baru di akun GitHub Anda (misal dinamai: smp-diponegoro-sampang ), lalu

hubungkan repositori lokal Anda ke remote GitHub:

\# Hubungkan repositori lokal ke remote GitHub (Ganti dengan URL GitHub Anda!)

git remote add origin https://github.com/USERNAME\_ANDA/smp-diponegoro-sampang.git

3\. Setup Struktur Cabang Utama

\# Membuat berkas inisiasi awal di cabang main

echo "# Sistem Informasi SMP Diponegoro Sampang" > README.md

git add README.md

git commit -m "chore: initial commit on main"

\# Buat cabang development dari main

git checkout -b development

🛠 Membuat dan Mengelola Fitur Baru

Saat Anda ingin mengembangkan fitur baru, selalu mulai dari cabang development , bukan dari

main .

Contoh Alur Kerja Mengembangkan Fitur UI Login:

1\. Pindah ke cabang development dan pastikan kodenya paling mutakhir:

git checkout development

git pull origin development

2\. Buat cabang fitur baru:

git checkout -b feature/ui-login

3\. Lakukan perubahan kode (Modifikasi/Tambahkan berkas), lalu komit:

\# Masukkan berkas index.html terbaru ke staging area

git add index.html

\# Lakukan komit dengan pesan yang deskriptif (standar Conventional Commits)

git commit -m "feat: implement responsive dark glassmorphism login card with d

4\. Kirim cabang fitur ke GitHub:

🔄 Penggabungan Cabang (Merging \& Pull Requests)

Setelah fitur di cabang feature/ui-login selesai diuji dan ingin digabungkan ke development ,

sangat direkomendasikan menggunakan fitur Pull Request (PR) di halaman GitHub untuk proses

peninjauan kode (Code Review).

Namun, jika Anda ingin menggabungkannya secara manual lewat CLI lokal, ikuti langkah berikut:

\# 1. Pindah ke cabang target (development)

git checkout development

\# 2. Tarik kode terbaru dari server untuk menghindari konflik hulu

git pull origin development

\# 3. Gabungkan cabang fitur ke development

git merge feature/ui-login

\# 4. Push hasil penggabungan ke GitHub

git push origin development

\# 5. Hapus cabang fitur lokal yang sudah tidak terpakai (opsional)

git branch -d feature/ui-login

⚠ Cara Menyelesaikan Konflik Penggabungan (Merge Conflict):

Jika terjadi konflik saat proses git merge , Git akan menandai bagian kode yang bermasalah di

dalam berkas Anda dengan tanda:

<<<<<<< HEAD

(Kode yang ada di cabang saat ini / development)

=======

(Kode baru yang dibawa dari cabang fitur / feature/ui-login)

>>>>>>> feature/ui-login

Langkah Solusi:

1\. Buka berkas yang berkonflik menggunakan Code Editor (seperti VS Code).

2\. Diskusikan dengan tim/analisis kode mana yang harus dipertahankan.

3\. Hapus penanda konflik ( <<<<<<< , ======= , >>>>>>> ) dan rapikan kodenya.

4\. Simpan berkas, lalu lakukan komit penyelesaian konflik:

git add index.html

git commit -m "merge: resolve merge conflicts between development and feature/

git push origin development

💡 Tips Pesan Komit (Conventional Commits)

Gunakan format pesan komit berikut agar riwayat repositori Anda mudah dipahami oleh

pengembang lain:

feat: ... -> Untuk fitur baru (Contoh: feat: add social media buttons with tooltips

to footer )

fix: ... -> Untuk perbaikan bug (Contoh: fix: resolve dropdown styling alignment

on small screens )

docs: ... -> Untuk perubahan dokumentasi saja (Contoh: docs: update deployment

instructions in readme )

style: ... -> Untuk perubahan kosmetik tanpa memengaruhi logika (Contoh: style:

reformat tailwind spacing in dashboard )

chore: ... -> Untuk tugas umum repositori/alat build (Contoh: chore: setup git branches

configuration )

