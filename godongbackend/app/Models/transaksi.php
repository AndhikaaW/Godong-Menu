<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class transaksi extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $fillable = ['id_user', 'nama','no_telepon', 'alamat','item','total','tanggal'];
}
