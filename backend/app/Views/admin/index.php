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
            background-color: #f4f6f9;
            font-family: 'Segoe UI', sans-serif;
            font-size: 0.95rem;
            color: #343a40;
            -webkit-font-smoothing: antialiased;
        }

        .navbar {
            background-color: #1f2d3d;
            padding: 0.75rem 1.5rem;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar-brand {
            font-weight: 600;
            font-size: 1.35rem;
            color: #fff !important;
        }

        .navbar-nav .nav-link {
            color: #ced4da !important;
            font-weight: 500;
            transition: 0.3s;
        }

        .navbar-nav .nav-link:hover,
        .navbar-nav .nav-link.active {
            color: #fff !important;
            background-color: rgba(255, 255, 255, 0.08);
            border-radius: 4px;
        }

        .logout-btn {
            background-color: #dc3545;
            color: #fff;
            font-weight: 500;
            font-size: 0.875rem;
            border-radius: 4px;
            transition: background 0.3s ease;
        }

        .logout-btn:hover {
            background-color: #bd2130;
            color: #fff;
        }

        .dashboard-header {
            font-size: 1.75rem;
            font-weight: 600;
            color: #2c3e50;
        }

        .card {
            border: none;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .card .icon {
            font-size: 2rem;
            opacity: 0.8;
        }

        .card-body {
            padding: 1.25rem 1.5rem;
        }

        .list-unstyled li {
            margin-bottom: 0.5rem;
        }

        .list-unstyled li a {
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .list-unstyled li a:hover {
            text-decoration: underline;
        }

        .alert-success {
            border-left: 5px solid #28a745;
            font-weight: 500;
        }

        .text-uppercase {
            font-size: 0.75rem;
            letter-spacing: 0.05em;
        }

        .section-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
        }
    </style>
</head>

<body>

    <!-- Navbar -->
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
            <div class="alert alert-success" id="autoDismissAlert">
                <?= session()->getFlashdata('success') ?>
            </div>
        <?php endif; ?>


        <!-- Dashboard Stats -->
        <div class="row g-4">
            <div class="col-md-6 col-xl-3">
                <div class="card border-start border-primary">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <div class="text-uppercase text-primary small mb-1">Monthly Projects</div>
                            <div class="h5 fw-bold"><?= $monthly_projects ?? '0' ?></div>
                        </div>
                        <i class="fas fa-project-diagram icon text-primary"></i>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-xl-3">
                <div class="card border-start border-success">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <div class="text-uppercase text-success small mb-1">Total Projects</div>
                            <div class="h5 fw-bold"><?= $total_projects ?? '0' ?></div>
                        </div>
                        <i class="fas fa-archive icon text-success"></i>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-xl-3">
                <div class="card border-start border-info">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <div class="text-uppercase text-info small mb-1">Blog Posts</div>
                            <div class="h5 fw-bold"><?= $total_posts ?? '0' ?></div>
                        </div>
                        <i class="fas fa-blog icon text-info"></i>
                    </div>
                </div>
            </div>

            <div class="col-md-6 col-xl-3">
                <div class="card border-start border-warning">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <div class="text-uppercase text-warning small mb-1">Unread Messages</div>
                            <div class="h5 fw-bold"><?= $unread_messages ?? '0' ?></div>
                        </div>
                        <i class="fas fa-envelope icon text-warning"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section Links -->
        <div class="row mt-5">
            <div class="col-md-6">
                <div class="card p-4">
                    <h5 class="section-title">Manage Projects</h5>
                    <ul class="list-unstyled">
                        <li><a href="<?= base_url('admin/projects') ?>" class="text-primary">📂 View All Projects</a></li>
                        <li><a href="<?= base_url('admin/projects/create') ?>" class="text-primary">➕ Add New Project</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card p-4">
                    <h5 class="section-title">Manage Blog Posts</h5>
                    <ul class="list-unstyled">
                        <li><a href="<?= base_url('admin/blogs') ?>" class="text-info">📝 View All Blogs</a></li>
                        <li><a href="<?= base_url('admin/blogs/create') ?>" class="text-info">➕ Add New Blog</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-md-12 mt-4">
                <div class="card p-4">
                    <h5 class="section-title">Contact Messages</h5>
                    <ul class="list-unstyled">
                        <li><a href="<?= base_url('admin/contacts') ?>" class="text-warning">📩 View Messages</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>




    <script>
        // Auto dismiss alert after 10 seconds
        setTimeout(function() {
            const alertBox = document.getElementById('autoDismissAlert');
            if (alertBox) {
                alertBox.style.transition = 'opacity 0.5s ease';
                alertBox.style.opacity = '0';
                setTimeout(() => alertBox.remove(), 500); // remove after fade out
            }
        }, 10000); // 10 seconds = 10000 ms
    </script>

</body>

</html>