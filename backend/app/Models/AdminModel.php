<?php

namespace App\Models;

use CodeIgniter\Model;

class AdminModel extends Model
{
    protected $table = 'admins';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'name',
        'email',
        'password_hash',
        'role',
        'created_at'
    ];

    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = ''; // no updated_at column
}
