<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\BlogModel;
use CodeIgniter\API\ResponseTrait;

class BlogController extends BaseController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        $this->model = new BlogModel();
    }

    // GET /blogs
    public function index()
    {
        $blogs = $this->model->findAll();
        return $this->respond($blogs, 200);
    }

    // GET /blogs/{id}
    public function show($id = null)
    {
        if (!$id || !$blog = $this->model->find($id)) {
            return $this->failNotFound('Blog not found');
        }
        return $this->respond($blog, 200);
    }

    // POST /blogs
    public function create()
    {
        $data = $this->request->getJSON(true);

        if ($data === null) {
            return $this->failValidationError('Invalid or missing JSON data');
        }

        if (!isset($data['title']) || empty(trim($data['title']))) {
            return $this->failValidationError('Title is required');
        }

        // Optional: validate other fields if needed

        $data['slug'] = url_title($data['title'], '-', true);

        $inserted = $this->model->insert($data);

        if (!$inserted) {
            return $this->failServerError('Failed to insert blog');
        }

        $data['id'] = $this->model->getInsertID();

        return $this->respondCreated($data);
    }

    // PUT /blogs/{id}
    public function update($id = null)
    {
        if (!$id || !$this->model->find($id)) {
            return $this->failNotFound('Blog not found');
        }

        $data = $this->request->getJSON(true);

        if ($data === null) {
            return $this->failValidationError('Invalid or missing JSON data');
        }

        if (isset($data['title']) && !empty(trim($data['title']))) {
            $data['slug'] = url_title($data['title'], '-', true);
        }

        $updated = $this->model->update($id, $data);

        if ($updated === false) {
            return $this->failServerError('Failed to update blog');
        }

        return $this->respond(['message' => 'Blog updated successfully']);
    }

    // DELETE /blogs/{id}
    public function delete($id = null)
    {
        if (!$id || !$this->model->find($id)) {
            return $this->failNotFound('Blog not found');
        }

        $deleted = $this->model->delete($id);

        if (!$deleted) {
            return $this->failServerError('Failed to delete blog');
        }

        return $this->respondDeleted(['message' => 'Blog deleted successfully']);
    }
}
