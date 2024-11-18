# Project Godong Menu 

## Bahasa yang digunakan :
1. Javascript
2. Typescript
3. PHP

- ! [#f03c15] ( https : //via.placeholder.com/15/f03c15/f03c15.png) ` #f03c15` - ![ #c5f015 ] ( https : //via.placeholder.com/15/c5f015/c5f015.png) `#c5f015` - ![ #1589F0 ]( https : //via.placeholder.com/15/1589F0/1589F0.png) `#1589F0` /* Bulat (Lingkaran) Warna: */ - ![ #f03c15 ]( https : //www.iconsdb.com/icons/download/color/f03c15/circle-16.png) `#f03c15` - ![ #c5f015 ]( https://www.iconsdb.com/icons/download/color/c5f015/circle-16.png ) `#c5f015` - ![ #1589F0 ]( https://www.iconsdb.com/icons/download/color/1589F0/circle-16.png ) ` #1589F0` /* pada yang terakhir Anda dapat masuk ke situs web dan mengubah bentuknya menjadi apa pun yang Anda inginkan dan menyalin tautan ke img dan menambahkannya ke README.md*/

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
