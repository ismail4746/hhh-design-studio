<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\AdminModel;

class Auth extends BaseController
{
    protected $adminModel;

    public function __construct()
    {
        $this->adminModel = new AdminModel();
        helper(['form', 'url']);
    }

    public function index()
    {
        if (!session()->get('is_admin_logged_in')) {
            return redirect()->to('/admin/login')->with('error', 'Please log in first.');
        }

        $data = [
            'title' => 'Admin Dashboard',
            'admin_name' => session()->get('admin_name'),
        ];

        return view('admin/index', $data);
    }
   
    public function register()
    {
        return view('admin/register'); 
    }

    public function submit()
    {
        $validation = \Config\Services::validation();

        $rules = [
            'name' => 'required|min_length[3]',
            'email' => 'required|valid_email|is_unique[admins.email]',
            'password' => 'required|min_length[6]',
            'confirm_password' => 'required|matches[password]',
        ];

        if (!$this->validate($rules)) {
            return redirect()->back()->withInput()->with('errors', $validation->getErrors());
        }

        $adminModel = new AdminModel();

        $data = [
            'name' => $this->request->getPost('name'),
            'email' => $this->request->getPost('email'),
            'password_hash' => password_hash($this->request->getPost('password'), PASSWORD_DEFAULT),
            'role' => 'admin',
            'created_at' => date('Y-m-d H:i:s'),
        ];

        $adminModel->insert($data);

        return redirect()->to('/admin/login')->with('success', 'Admin registered successfully.');
    }

    public function loginView()
    {
        return view('admin/login');
    }

    public function loginSubmit()
    {
        $email = $this->request->getPost('email');
        $password = $this->request->getPost('password');

        $adminModel = new AdminModel();
        $admin = $adminModel->where('email', $email)->first();

        if (!$admin || !password_verify($password, $admin['password_hash'])) {
            return redirect()->back()->withInput()->with('error', 'Invalid email or password.');
        }

        session()->set([
            'admin_id' => $admin['id'],
            'admin_name' => $admin['name'],
            'admin_email' => $admin['email'],
            'admin_role' => $admin['role'],
            'is_admin_logged_in' => true,
        ]);

        return redirect()->to('/admin/dashboard')->with('success', 'Login successful!');
    }

    public function logout()
    {
        session()->destroy();
        return redirect()->to('/admin/login')->with('success', 'Logged out successfully.');
    }

    
}
