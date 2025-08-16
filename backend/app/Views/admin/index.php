<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title><?= esc($title ?? 'Admin Panel') ?></title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    <style>
        body {
            background-color: #f8f9fa;
        }

        .navbar {
            background-color: #1e2a38;
            padding: 0.75rem 1.5rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .navbar-brand {
            font-weight: 600;
            font-size: 1.25rem;
            color: #ffffff !important;
        }

        .navbar-nav .nav-link {
            color: #e0e0e0 !important;
            font-weight: 500;
            padding: 0.5rem 1rem;
            transition: color 0.3s ease, background 0.3s ease;
            border-radius: 4px;
        }

        .navbar-nav .nav-link:hover,
        .navbar-nav .nav-link.active {
            color: #ffffff !important;
            background-color: rgba(255, 255, 255, 0.1);
        }

        .logout-btn {
            background-color: #dc3545;
            color: #ffffff !important;
            padding: 0.45rem 1rem;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: background-color 0.3s ease;
            border: none;
        }

        .logout-btn:hover {
            background-color: #c82333;
            text-decoration: none;
            color: #fff;
        }


        .card {
            transition: 0.3s;
        }

        .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .dashboard-header {
            font-size: 28px;
            font-weight: 600;
        }

        .card .icon {
            font-size: 2rem;
            color: #6c757d;
        }

        .text-gray-800 {
            color: #343a40 !important;
        }

        .success {
            color: green;
            font-weight: 500;
        }
    </style>
</head>

<body>

    <!-- Top Navbar -->
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Admin Panel</a>
            <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="<?= base_url('admin/dashboard') ?>">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?= base_url('admin/projects') ?>">Projects</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?= base_url('admin/blogs') ?>">Blogs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?= base_url('admin/contacts') ?>">Messages</a>
                    </li>
                </ul>
                <a href="<?= base_url('admin/logout') ?>" class="btn logout-btn ms-3">Logout</a>
            </div>
        </div>
    </nav>


    <!-- Main Content -->
    <div class="container mt-5">
        <div class="dashboard-header mb-4">Welcome, <?= esc($admin_name) ?>!</div>

        <?php if (session()->getFlashdata('success')): ?>
            <div class="alert alert-success"><?= session()->getFlashdata('success') ?></div>
        <?php endif; ?>

        <!-- Dashboard Cards -->
        <div class="row g-4">
            <div class="col-md-6 col-xl-3">
                <div class="card border-start border-primary shadow-sm h-100">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <div class="text-uppercase text-primary fw-semibold small mb-1">Monthly Projects</div>
                            <div class="h5 mb-0 fw-bold text-gray-800"><?= $monthly_projects ?? '0' ?></div>
                        </div>
                        <i class="fas fa-project-diagram icon"></i>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-xl-3">
                <div class="card border-start border-success shadow-sm h-100">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <div class="text-uppercase text-success fw-semibold small mb-1">Total Projects</div>
                            <div class="h5 mb-0 fw-bold text-gray-800"><?= $total_projects ?? '0' ?></div>
                        </div>
                        <i class="fas fa-archive icon"></i>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-xl-3">
                <div class="card border-start border-info shadow-sm h-100">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <div class="text-uppercase text-info fw-semibold small mb-1">Blog Posts</div>
                            <div class="h5 mb-0 fw-bold text-gray-800"><?= $total_posts ?? '0' ?></div>
                        </div>
                        <i class="fas fa-blog icon"></i>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-xl-3">
                <div class="card border-start border-warning shadow-sm h-100">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <div class="text-uppercase text-warning fw-semibold small mb-1">Unread Messages</div>
                            <div class="h5 mb-0 fw-bold text-gray-800"><?= $unread_messages ?? '0' ?></div>
                        </div>
                        <i class="fas fa-envelope icon"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section Links -->
        <div class="row mt-5">
            <div class="col-md-6">
                <div class="card p-4">
                    <h5 class="fw-bold">Manage Portfolio Projects</h5>
                    <ul class="list-unstyled mt-2">
                        <li><a href="<?= base_url('admin/projects') ?>" class="text-decoration-none text-primary">📂 View All Projects</a></li>
                        <li><a href="<?= base_url('admin/projects/create') ?>" class="text-decoration-none text-primary">➕ Add New Project</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card p-4">
                    <h5 class="fw-bold">Manage Blog Posts</h5>
                    <ul class="list-unstyled mt-2">
                        <li><a href="<?= base_url('admin/blogs') ?>" class="text-decoration-none text-info">📝 View All Blogs</a></li>
                        <li><a href="<?= base_url('admin/blogs/create') ?>" class="text-decoration-none text-info">➕ Add New Blog</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-md-12 mt-4">
                <div class="card p-4">
                    <h5 class="fw-bold">Contact Messages</h5>
                    <ul class="list-unstyled mt-2">
                        <li><a href="<?= base_url('admin/contacts') ?>" class="text-decoration-none text-warning">📩 View Messages</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS (optional if needed for dropdowns, modals, etc.) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>