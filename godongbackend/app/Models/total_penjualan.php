<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class total_penjualan extends Model
{
    protected $table = 'total_penjualan';
    protected $fillable = [
        'faktur', 'id_user', 'no_telepon',    'alamat', 'item', 'sub_total', 'total'

    ];
    public $timestamps = false;
    use HasFactory;
}
