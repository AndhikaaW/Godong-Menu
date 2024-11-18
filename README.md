
# 🌿 **Project Godong Menu**

**Godong Menu** adalah aplikasi modern yang dirancang untuk memberikan pengalaman optimal dalam manajemen menu berbasis teknologi. Proyek ini menggunakan teknologi terkini untuk pengembangan frontend, backend, dan database.

---

## **📌 Teknologi yang Digunakan**
| **Bahasa**        | **Framework/Tools**       | **Versi**        |
|--------------------|---------------------------|------------------|
| **TypeScript**     | Next.js                  | **14.2.4**       |
| **PHP**            | Laravel                  | **10.48.16**     |
| -                  | MySQL                    | **8.0.30**       |
| -                  | NPM                      | **10.7.0**       |
| -                  | Composer                 | **2.4.1**        |

---

## **📖 Panduan Instalasi**

### **1. Frontend (Next.js)**  
Ikuti langkah-langkah berikut untuk menjalankan aplikasi frontend:  
1. Navigasikan ke folder **`frontgodong`**:  
   ```bash
   cd frontgodong
   ```  
2. Instal semua dependensi yang diperlukan:  
   ```bash
   npm install
   ```  
3. Jalankan aplikasi frontend:  
   ```bash
   npm run dev
   ```  

### **2. Backend (Laravel)**  
Langkah-langkah untuk mengatur backend menggunakan Laravel:  
1. Navigasikan ke folder **`godongbackend`**:  
   ```bash
   cd godongbackend
   ```  
2. Instal semua dependensi dengan Composer:  
   ```bash
   composer install
   ```  
3. Jalankan perintah berikut untuk memuat ulang autoloader:  
   ```bash
   composer dump-autoload
   ```
4. Ubah nama file **`.env.example`** menjadi **`.env`**
   
5. Generate kunci aplikasi:
   ```bash
   php artisan key:generate
   ```  

6. Atur konfigurasi database di file **`.env`** sesuai kebutuhan Anda:  
   ```env
   DB_DATABASE=godong_menu
   DB_USERNAME=root
   DB_PASSWORD=
   ```  
7. Jalankan server backend dengan IP dan port khusus:  
   ```bash
   php artisan serve --host=[IP_ADDRESS] --port=8000
   ```  

---

### **3. Integrasi Backend dengan Frontend**  
Langkah-langkah untuk mengintegrasikan backend Laravel ke frontend Next.js:  
1. Buka file **`api.tsx`** yang berada di:  
   ```text
   frontgodong/app/api/godongbackend/api.tsx
   ```  
2. Sesuaikan IP backend di bagian berikut:  
   ```typescript
   const api_url = "http://[IP_ADDRESS]:8000";
   ```
3. Untuk username dari admin nya adalah
   ```text
   Username : superadmin@gmail.com
   Password : admin123    

Jika langkah-langkah di atas berhasil, frontend dan backend akan terintegrasi dengan baik. 🚀  

---

## **🎯 Siap Digunakan!**
Dengan mengikuti panduan ini, aplikasi **Godong Menu** siap dijalankan dan digunakan sesuai kebutuhan Anda. Jika Anda menemukan kendala, jangan ragu untuk menghubungi tim pengembang.  

Selamat mencoba dan semoga sukses! 💪
