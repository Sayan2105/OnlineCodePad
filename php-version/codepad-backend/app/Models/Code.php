<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    protected $fillable = [
        'category',
        'subtopic',
        'title',
        'explanation',
        'tldr',
        'code',
    ];
}
