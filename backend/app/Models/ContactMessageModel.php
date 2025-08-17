<?php

namespace App\Models;

use CodeIgniter\Model;

class ContactMessageModel extends Model
{
    protected $table = 'contact_messages';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name', 'email', 'message', 'reply', 'read_status', 'submitted_at', 'replied_at'];
    protected $useTimestamps = false;
}
