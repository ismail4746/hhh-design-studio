<?php

namespace App\Models;

use CodeIgniter\Model;

class ProjectImageModel extends Model
{
    protected $table            = 'project_images';
    protected $primaryKey       = 'id';
    protected $allowedFields    = ['project_id', 'image_url', 'caption' , 'image_type'];

    protected $useTimestamps    = true; // ✅ To auto-fill created_at
    protected $createdField     = 'created_at';
    protected $updatedField     = ''; // ❌ No updated_at column in table
}
