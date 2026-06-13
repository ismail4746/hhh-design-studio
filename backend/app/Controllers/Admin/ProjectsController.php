<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\ProjectModel;
use App\Models\ProjectImageModel;

class ProjectsController extends BaseController
{
    protected $projectModel;
    protected $projectImageModel;

    public function __construct()
    {
        $this->projectModel = new ProjectModel();
        $this->projectImageModel = new ProjectImageModel();
        helper(['form', 'url']);
    }

    protected function isApiRequest()
    {
        // Check if AJAX or Accept header prefers JSON
        $acceptHeader = $this->request->getHeader('accept');
        return $this->request->isAJAX() || ($acceptHeader && strpos($acceptHeader->getValue(), 'application/json') !== false);
    }

    // List all projects
    public function index()
    {
        $projects = $this->projectModel->findAll();

        foreach ($projects as &$project) {
            $project['images'] = $this->projectImageModel->where('project_id', $project['id'])->findAll();
        }

        if ($this->isApiRequest()) {
            return $this->response->setJSON([
                'status' => true,
                'data' => $projects,
            ]);
        }

        $data['projects'] = $projects;
        return view('admin/projects/index', $data);
    }

    // Show create form
    public function create()
    {
        if ($this->isApiRequest()) {
            return $this->response->setStatusCode(405)->setJSON([
                'status' => false,
                'message' => 'Method not allowed for API',
            ]);
        }
        return view('admin/projects/create');
    }

    // Save new project
    public function store()
    {
        $validation = \Config\Services::validation();

        $rules = [
            'name' => 'required',
            'status' => 'required',
        ];

        if (!$this->validate($rules)) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(422)
                    ->setJSON(['status' => false, 'errors' => $validation->getErrors()]);
            }
            return redirect()->back()->withInput()->with('errors', $validation->getErrors());
        }

        $projectData = [
            'name'        => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'start_date'  => $this->request->getPost('start_date'),
            'end_date'    => $this->request->getPost('end_date'),
            'status'      => $this->request->getPost('status'),
        ];

        $projectId = $this->projectModel->insert($projectData);

        $images = $this->request->getFiles();
        $imageTypes = $this->request->getPost('image_types'); // Get image types from form

        if (isset($images['images']) && is_array($images['images'])) {
            foreach ($images['images'] as $index => $image) {
                if ($image->isValid() && !$image->hasMoved()) {
                    $mimeType = $image->getMimeType();
                    if (in_array($mimeType, ['image/jpeg', 'image/png', 'image/gif', 'image/webp'])) {
                        $newName = $image->getRandomName();
                        $image->move(FCPATH . 'uploads/projects', $newName);

                        $savedName = $this->convertToWebP(FCPATH . 'uploads/projects/' . $newName) ?? $newName;

                        $imageType = isset($imageTypes[$index]) ? $imageTypes[$index] : null;

                        $this->projectImageModel->insert([
                            'project_id' => $projectId,
                            'image_url'  => 'uploads/projects/' . $savedName,
                            'image_type' => $imageType,
                        ]);
                    }
                }
            }
        }

        if ($this->isApiRequest()) {
            return $this->response->setStatusCode(201)->setJSON([
                'status' => true,
                'message' => 'Project created successfully!',
                'project_id' => $projectId,
            ]);
        }

        return redirect()->to(site_url('admin/projects'))->with('success', 'Project created successfully!');
    }


    // Show edit form
    public function edit($id)
    {
        $project = $this->projectModel->find($id);
        if (!$project) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(404)->setJSON([
                    'status' => false,
                    'message' => 'Project not found',
                ]);
            }
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound("Project not found");
        }

        if ($this->isApiRequest()) {
            $project['images'] = $this->projectImageModel->where('project_id', $id)->findAll();
            return $this->response->setJSON([
                'status' => true,
                'data' => $project,
            ]);
        }

        $data['project'] = $project;
        $data['images'] = $this->projectImageModel->where('project_id', $id)->findAll();
        return view('admin/projects/edit', $data);
    }

    // Update project
    public function update($id)
    {
        $project = $this->projectModel->find($id);
        if (!$project) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(404)->setJSON([
                    'status' => false,
                    'message' => 'Project not found',
                ]);
            }
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound("Project not found");
        }

        $validation = \Config\Services::validation();
        $rules = [
            'name' => 'required|min_length[3]|max_length[255]',
            'description' => 'permit_empty',
            'start_date' => 'permit_empty|valid_date',
            'end_date' => 'permit_empty|valid_date',
            'status' => 'required|in_list[planned,in_progress,completed,on_hold]'
        ];

        if (!$this->validate($rules)) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(422)
                    ->setJSON(['status' => false, 'errors' => $this->validator->getErrors()]);
            }
            return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
        }

        $this->projectModel->update($id, [
            'name' => $this->request->getPost('name'),
            'description' => $this->request->getPost('description'),
            'start_date' => $this->request->getPost('start_date'),
            'end_date' => $this->request->getPost('end_date'),
            'status' => $this->request->getPost('status'),
        ]);

        if ($this->isApiRequest()) {
            return $this->response->setJSON([
                'status' => true,
                'message' => 'Project updated successfully',
            ]);
        }

        return redirect()->to('/admin/projects')->with('success', 'Project updated successfully');
    }

    // Delete project
    public function delete($id)
    {
        $project = $this->projectModel->find($id);
        if (!$project) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(404)->setJSON([
                    'status' => false,
                    'message' => 'Project not found',
                ]);
            }
            return redirect()->to('/admin/projects')->with('error', 'Project not found');
        }

        $this->projectModel->delete($id);

        if ($this->isApiRequest()) {
            return $this->response->setJSON([
                'status' => true,
                'message' => 'Project deleted successfully',
            ]);
        }

        return redirect()->to('/admin/projects')->with('success', 'Project deleted successfully');
    }

    // Upload and add image for project
    // public function addImage($projectId)
    // {
    //     $project = $this->projectModel->find($projectId);
    //     if (!$project) {
    //         if ($this->isApiRequest()) {
    //             return $this->response->setStatusCode(404)->setJSON([
    //                 'status' => false,
    //                 'message' => 'Project not found',
    //             ]);
    //         }
    //         throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound("Project not found");
    //     }

    //     $validationRule = [
    //         'image' => [
    //             'label' => 'Image File',
    //             'rules' => 'uploaded[image]|is_image[image]|max_size[image,2048]',
    //         ],
    //     ];

    //     if (!$this->validate($validationRule)) {
    //         if ($this->isApiRequest()) {
    //             return $this->response->setStatusCode(422)->setJSON(['status' => false, 'errors' => $this->validator->getErrors()]);
    //         }
    //         return redirect()->back()->with('errors', $this->validator->getErrors());
    //     }

    //     $img = $this->request->getFile('image');

    //     if ($img->isValid() && !$img->hasMoved()) {
    //         $newName = $img->getRandomName();
    //         $img->move(FCPATH . 'uploads/projects', $newName);

    //         $this->projectImageModel->save([
    //             'project_id' => $projectId,
    //             'image_url' => 'uploads/projects/' . $newName,
    //             'caption' => $this->request->getPost('caption'),
    //         ]);

    //         if ($this->isApiRequest()) {
    //             return $this->response->setJSON(['status' => true, 'message' => 'Image uploaded successfully']);
    //         }

    //         return redirect()->back()->with('success', 'Image uploaded successfully');
    //     } else {
    //         if ($this->isApiRequest()) {
    //             return $this->response->setStatusCode(500)->setJSON(['status' => false, 'message' => 'Failed to upload image']);
    //         }
    //         return redirect()->back()->with('error', 'Failed to upload image');
    //     }
    // }

    public function addImage($projectId)
    {
        $project = $this->projectModel->find($projectId);
        if (!$project) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(404)->setJSON([
                    'status' => false,
                    'message' => 'Project not found',
                ]);
            }
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound("Project not found");
        }

        $validationRule = [
            'image' => [
                'label' => 'Image File',
                'rules' => 'uploaded[image]|is_image[image]|max_size[image,2048]',
            ],
        ];

        if (!$this->validate($validationRule)) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(422)->setJSON(['status' => false, 'errors' => $this->validator->getErrors()]);
            }
            return redirect()->back()->with('errors', $this->validator->getErrors());
        }

        $img = $this->request->getFile('image');
        $imageType = $this->request->getPost('image_type'); // New: get image type

        if ($img->isValid() && !$img->hasMoved()) {
            $newName = $img->getRandomName();
            $img->move(FCPATH . 'uploads/projects', $newName);

            $savedName = $this->convertToWebP(FCPATH . 'uploads/projects/' . $newName) ?? $newName;

            $this->projectImageModel->save([
                'project_id' => $projectId,
                'image_url'  => 'uploads/projects/' . $savedName,
                'caption'    => $this->request->getPost('caption'),
                'image_type' => $imageType, // New: store image type
            ]);

            if ($this->isApiRequest()) {
                return $this->response->setJSON(['status' => true, 'message' => 'Image uploaded successfully']);
            }

            return redirect()->back()->with('success', 'Image uploaded successfully');
        } else {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(500)->setJSON(['status' => false, 'message' => 'Failed to upload image']);
            }
            return redirect()->back()->with('error', 'Failed to upload image');
        }
    }


    // Delete image
    public function deleteImage($imageId)
    {
        $image = $this->projectImageModel->find($imageId);
        if (!$image) {
            if ($this->isApiRequest()) {
                return $this->response->setStatusCode(404)->setJSON(['status' => false, 'message' => 'Image not found']);
            }
            return redirect()->back()->with('error', 'Image not found');
        }

        $path = FCPATH . $image['image_url'];
        if (file_exists($path)) {
            unlink($path);
        }

        $this->projectImageModel->delete($imageId);

        if ($this->isApiRequest()) {
            return $this->response->setJSON(['status' => true, 'message' => 'Image deleted successfully']);
        }

        return redirect()->back()->with('success', 'Image deleted successfully');
    }

    // Convert uploaded image to WebP and return the new filename, or null on failure
    private function convertToWebP(string $sourcePath, int $quality = 82): ?string
    {
        $mime = mime_content_type($sourcePath);

        if ($mime === 'image/webp') {
            return basename($sourcePath);
        }

        if ($mime === 'image/jpeg') {
            $src = imagecreatefromjpeg($sourcePath);
        } elseif ($mime === 'image/png') {
            $src = imagecreatefrompng($sourcePath);
            imagepalettetotruecolor($src);
            imagealphablending($src, true);
            imagesavealpha($src, true);
        } elseif ($mime === 'image/gif') {
            $src = imagecreatefromgif($sourcePath);
        } else {
            return null;
        }

        if (!$src) return null;

        $webpPath = preg_replace('/\.[^.]+$/', '.webp', $sourcePath);
        $ok = imagewebp($src, $webpPath, $quality);
        imagedestroy($src);

        if (!$ok) return null;

        @unlink($sourcePath);

        return basename($webpPath);
    }
}
