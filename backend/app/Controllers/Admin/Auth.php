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

        $db = \Config\Database::connect();

        // Count total projects from `projects` table
        $total_projects = $db->table('projects')->countAllResults();

        // Count total blog posts from `blog_posts` table
        $total_posts = $db->table('blog_posts')->countAllResults();

        // Count unread messages from `contact_messages` where read_status = 0 (false)
        $unread_messages = $db->table('contact_messages')->where('read_status', false)->countAllResults();

        // You don’t have a monthly projects count explicitly, but you can count projects created this month:
        $monthly_projects = $db->table('projects')
            ->where('created_at >=', date('Y-m-01'))  // first day of current month
            ->countAllResults();

        $data = [
            'title' => 'Admin Dashboard',
            'admin_name' => session()->get('admin_name'),
            'total_projects' => $total_projects,
            'total_posts' => $total_posts,
            'unread_messages' => $unread_messages,
            'monthly_projects' => $monthly_projects,
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
