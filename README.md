# Project Godong Menu

## Bahasa yang digunakan :
1. Javascript
2. Typescript
3. PHP


## Framework Version :
  1. Laravel  : 10.48.16
  2. Next Js  : 14.2.4
  3. MySQL    : 8.0.30
  4. NPM      : 10.7.0
  5. Composer : 2.4.1

## Installation Guide : 
  a. Front End Next Js :
     1. Pergi ke folder frontgodong dan run commend'npm install'
     2. Jalankan Front End dengan run command 'npm run dev'
        
  b. Backend Laravel
     1. Pergi ke folder godongbackend dan run command 'composer install'
     2. Lalu setelah selesai install ketikan command 'composer dump-autoload'.
     3. Jika sudah selesai ketikkan command lagi 'composer key:generate'
     4. Setelah key digenerate pergi file .env dan sesuaikan dengan yang dibawah 
          DB_DATABASE=godong_menu
          DB_USERNAME=root
          DB_PASSWORD= 
      atau sesuaikan dengan device sendiri
    5. Setelah selesai mengubah run command 'php artisan serve --host=[ip kalian] --port=8000
    6. Jika sudah berhasil maka backend sudah berhasil di intalasi dan dapat dijalankan
       
  c. Integrasi backend di front end
    1. Pergi ke file api.tsx di  'frontgodong/app/api/godongbackend/api.tsx'
    2. Ubah ip backend dibagian 'const api_url = "ip_kalian"';
    3. Jika sudah berhasil terinntegrasi maka akan sejalan antara backend dan frontend nya
