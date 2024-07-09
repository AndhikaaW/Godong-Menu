<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categories;
class MenuItem extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'id',
    //     'category_id',
    //     'name',
    //     'price',
    //     'image',
    //     'description',
    // ];
    protected $fillable = ['id', 'category_id', 'name', 'price', 'image','description'];

    public $timestamps=false;
}
