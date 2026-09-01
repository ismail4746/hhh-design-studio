<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\BlogModel;

class BlogController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new BlogModel();
    }

    protected function isApiRequest()
    {
        return $this->request->isAJAX() || $this->request->getHeaderLine('Accept') === 'application/json';
    }

    // List all blogs
    public function index()
    {
        $blogs = $this->model->findAll();

        if ($this->isApiRequest()) {
            // Add full URL for thumbnail images
            foreach ($blogs as &$blog) {
                $blog['thumbnail'] = $blog['thumbnail']
                    ? base_url('uploads/blogs/' . $blog['thumbnail'])
                    : null;
            }
            return $this->response->setJSON($blogs);
        }

        return view('admin/blogs/index', ['blogs' => $blogs]);
    }

    // Show create form
    public function create()
    {
        if ($this->isApiRequest()) {
            return $this->response->setStatusCode(405)->setJSON(['error' => 'Method not allowed']);
        }

        return view('admin/blogs/create');
    }

    // Store new blog (web form or API JSON)
    public function store()
    {
        $request = service('request');

        if ($this->isApiRequest()) {
            $input = $request->getJSON(true);

            if (empty($input['title'])) {
                return $this->response->setStatusCode(400)->setJSON(['error' => 'Title is required']);
            }

            $data = [
                'title' => $input['title'],
                'slug' => url_title($input['title'], '-', true),
                'content' => $input['content'] ?? '',
                'category' => $input['category'] ?? '',
                'tags' => $input['tags'] ?? '',
                'thumbnail' => null, // No image upload via API here
            ];

            $this->model->insert($data);
            $data['id'] = $this->model->getInsertID();

            return $this->response->setStatusCode(201)->setJSON(['message' => 'Blog created', 'blog' => $data]);
        } else {
            // Handle web form
            $data = [
                'title'     => $request->getPost('title'),
                'slug'      => url_title($request->getPost('title'), '-', true),
                'content'   => $request->getPost('content'),
                'category'  => $request->getPost('category'),
                'tags'      => $request->getPost('tags'),
            ];

            $file = $request->getFile('thumbnail');
            if ($file && $file->isValid() && !$file->hasMoved()) {
                $newName = $file->getRandomName();
                if ($file->move(FCPATH . 'uploads/blogs', $newName)) {
                    $data['thumbnail'] = $newName;
                } else {
                    return redirect()->back()->with('error', 'Failed to upload thumbnail')->withInput();
                }
            } else {
                $data['thumbnail'] = null;
            }


            if (empty($data['title'])) {
                return redirect()->back()->with('error', 'Title is required')->withInput();
            }

            $this->model->insert($data);

            return redirect()->to(base_url('admin/blogs'))->with('success', 'Blog created successfully');
        }
    }

    // Show edit form
    public function edit($id)
    {
        if ($this->isApiRequest()) {
            return $this->response->setStatusCode(405)->setJSON(['error' => 'Method not allowed']);
        }

        $blog = $this->model->find($id);
        if (!$blog) {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound("Blog with id $id not found");
        }

        return view('admin/blogs/edit', ['blog' => $blog]);
    }

    // Update blog (web form or API JSON)
    public function update($id)
    {
        $request = service('request');

        $blog = $this->model->find($id);
        if (!$blog) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(404)->setJSON(['error' => 'Blog not found']);
            }
            return redirect()->to(base_url('admin/blogs'))->with('error', 'Blog not found');
        }

        if ($this->isApiRequest()) {
            $input = $request->getJSON(true);

            if (empty($input['title'])) {
                return $this->response->setStatusCode(400)->setJSON(['error' => 'Title is required']);
            }

            $data = [
                'title' => $input['title'],
                'slug' => url_title($input['title'], '-', true),
                'content' => $input['content'] ?? '',
                'category' => $input['category'] ?? '',
                'tags' => $input['tags'] ?? '',
                // No thumbnail update via API for now
                'thumbnail' => $blog['thumbnail'],
            ];

            $this->model->update($id, $data);

            return $this->response->setJSON(['message' => 'Blog updated', 'blog' => $data]);
        } else {
            $data = [
                'title'     => $request->getPost('title'),
                'slug'      => url_title($request->getPost('title'), '-', true),
                'content'   => $request->getPost('content'),
                'category'  => $request->getPost('category'),
                'tags'      => $request->getPost('tags'),
            ];

            $file = $request->getFile('thumbnail');
            if ($file && $file->isValid() && !$file->hasMoved()) {
                // Delete old thumbnail
                if (!empty($blog['thumbnail']) && file_exists(FCPATH . 'uploads/blogs/' . $blog['thumbnail'])) {
                    unlink(FCPATH . 'uploads/blogs/' . $blog['thumbnail']);
                }
                $newName = $file->getRandomName();
                $file->move(FCPATH . 'uploads/blogs', $newName);
                $data['thumbnail'] = $newName;
            } else {
                $data['thumbnail'] = $blog['thumbnail'];
            }

            if (empty($data['title'])) {
                return redirect()->back()->with('error', 'Title is required')->withInput();
            }

            $this->model->update($id, $data);

            return redirect()->to(base_url('admin/blogs'))->with('success', 'Blog updated successfully');
        }
    }

    // Delete blog (web or API)
    public function delete($id)
    {
        $blog = $this->model->find($id);
        if (!$blog) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(404)->setJSON(['error' => 'Blog not found']);
            }
            return redirect()->to(base_url('admin/blogs'))->with('error', 'Blog not found');
        }

        if (!empty($blog['thumbnail']) && file_exists(FCPATH . 'uploads/blogs/' . $blog['thumbnail'])) {
            unlink(FCPATH . 'uploads/blogs/' . $blog['thumbnail']);
        }

        $this->model->delete($id);

        if ($this->isApiRequest()) {
            return $this->response->setJSON(['message' => 'Blog deleted']);
        }

        return redirect()->to(base_url('admin/blogs'))->with('success', 'Blog deleted successfully');
    }

    public function show($id)
    {
        $blog = $this->model->find($id);
        if (!$blog) {
            return $this->response->setStatusCode(404)->setJSON(['error' => 'Blog not found']);
        }

        $blog['thumbnail'] = $blog['thumbnail'] ? base_url('uploads/blogs/' . $blog['thumbnail']) : null;

        return $this->response->setJSON($blog);
    }
}
