<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?= esc($title ?? 'Admin Panel') ?></title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

    <style>
        /* Base */
        * {
            box-sizing: border-box;
        }

        body,
        html {
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: 'Inter', sans-serif;
            background: #f9fafb;
            color: #374151;
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        a:hover {
            color: #2563eb;
        }

        /* Sidebar */
        .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            width: 220px;
            height: 100%;
            background: #ffffff;
            border-right: 1px solid #e5e7eb;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
            display: flex;
            flex-direction: column;
            padding: 1.8rem 1rem;
            user-select: none;
            z-index: 1000;
        }

        .sidebar .brand {
            font-weight: 700;
            font-size: 1.6rem;
            letter-spacing: 2px;
            color: #2563eb;
            text-align: center;
            margin-bottom: 2rem;
            user-select: none;
        }

        .sidebar nav {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }

        .sidebar nav a {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            color: #4b5563;
            font-weight: 600;
            border-radius: 8px;
            transition: background-color 0.25s ease, color 0.25s ease;
            font-size: 1rem;
        }

        .sidebar nav a i {
            font-size: 1.25rem;
            color: #60a5fa;
            transition: color 0.25s ease;
            width: 20px;
            text-align: center;
        }

        .sidebar nav a.active,
        .sidebar nav a:hover {
            background-color: #2563eb;
            color: white;
        }

        .sidebar nav a.active i,
        .sidebar nav a:hover i {
            color: white;
        }

        .sidebar .logout-btn {
            padding: 12px;
            background: #ef4444;
            color: white;
            border: none;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
            user-select: none;
            margin-top: 1rem;
            transition: background-color 0.25s ease;
        }

        .sidebar .logout-btn:hover {
            background: #b91c1c;
        }

        /* Main content */
        .main-content {
            margin-left: 220px;
            padding: 2rem 2.5rem;
            min-height: 100vh;
        }

        .dashboard-header {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
            color: #1f2937;
            user-select: none;
        }

        /* Cards grid */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1.2rem;
            margin-bottom: 3rem;
        }

        /* Card */
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgb(0 0 0 / 0.05);
            padding: 1.5rem 1.8rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: default;
            transition: box-shadow 0.3s ease;
            user-select: none;
        }

        .card:hover {
            box-shadow: 0 6px 16px rgb(37 99 235 / 0.3);
        }

        .card .text {
            display: flex;
            flex-direction: column;
        }

        .card .label {
            text-transform: uppercase;
            font-weight: 700;
            font-size: 0.75rem;
            color: #6b7280;
            letter-spacing: 0.1em;
            margin-bottom: 0.3rem;
            user-select: text;
        }

        .card .value {
            font-size: 1.9rem;
            font-weight: 700;
            color: #1e40af;
            user-select: text;
        }

        .card .icon {
            font-size: 2.4rem;
            color: #2563eb;
            user-select: none;
        }

        /* Sections below cards */
        .sections {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .section-card {
            flex: 1 1 280px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgb(0 0 0 / 0.05);
            padding: 2rem;
            user-select: none;
            transition: box-shadow 0.3s ease;
        }

        .section-card:hover {
            box-shadow: 0 8px 20px rgb(37 99 235 / 0.3);
        }

        .section-card h5 {
            font-weight: 700;
            font-size: 1.4rem;
            margin-bottom: 1.2rem;
            color: #2563eb;
            user-select: none;
        }

        .section-card ul {
            list-style: none;
            padding-left: 0;
        }

        .section-card ul li {
            margin-bottom: 1rem;
        }

        .section-card ul li a {
            font-weight: 600;
            color: #374151;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            user-select: text;
            transition: color 0.25s ease;
        }

        .section-card ul li a:hover {
            color: #2563eb;
            transform: translateX(5px);
        }

        /* Alert */
        .alert-success {
            margin-top: 2rem;
            background: #d1fae5;
            border-left: 6px solid #10b981;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-weight: 700;
            color: #065f46;
            box-shadow: 0 0 8px #10b981aa;
            user-select: none;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar {
                position: relative;
                width: 100%;
                height: auto;
                flex-direction: row;
                padding: 1rem;
                border-right: none;
                border-bottom: 1px solid #e5e7eb;
                box-shadow: none;
            }

            .sidebar nav {
                flex-direction: row;
                gap: 1rem;
                overflow-x: auto;
            }

            .sidebar nav a {
                margin-bottom: 0;
                padding: 10px 12px;
                font-size: 0.9rem;
            }

            .main-content {
                margin-left: 0;
                padding: 1.5rem 1rem;
            }

            .cards-grid {
                grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                gap: 1rem;
            }

            .sections {
                flex-direction: column;
            }

            .section-card {
                width: 100%;
            }
        }
    </style>
</head>

<body>
    <!-- Sidebar -->
    <aside class="sidebar" aria-label="Sidebar navigation">
        <div class="brand">ADMIN PANEL</div>
        <nav>
            <a href="<?= base_url('admin/dashboard') ?>" class="<?= uri_string() == 'admin/dashboard' ? 'active' : '' ?>"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
            <a href="<?= base_url('admin/projects') ?>" class="<?= uri_string() == 'admin/projects' ? 'active' : '' ?>"><i class="fas fa-folder-open"></i> Projects</a>
            <a href="<?= base_url('admin/blogs') ?>" class="<?= uri_string() == 'admin/blogs' ? 'active' : '' ?>"><i class="fas fa-blog"></i> Blogs</a>
            <a href="<?= base_url('admin/messages') ?>" class="<?= uri_string() == 'admin/contacts' ? 'active' : '' ?>"><i class="fas fa-envelope"></i> Messages</a>
        </nav>
        <button onclick="window.location='<?= base_url('admin/logout') ?>'" class="logout-btn" aria-label="Logout">Logout</button>
    </aside>


    <!-- Main Content -->
    <main class="main-content">
        <h1 class="dashboard-header">Welcome, <?= esc($admin_name) ?>!</h1>

        <?php if (session()->getFlashdata('success')): ?>
            <div class="alert-success" role="alert">
                <?= session()->getFlashdata('success') ?>
            </div>
        <?php endif; ?>

        <section class="cards-grid" aria-label="Dashboard statistics">
            <article class="card" aria-labelledby="monthly-projects-title">
                <div class="text">
                    <div id="monthly-projects-title" class="label">Monthly Projects</div>
                    <div class="value"><?= $monthly_projects ?? '0' ?></div>
                </div>
                <i class="fas fa-project-diagram icon" aria-hidden="true"></i>
            </article>

            <article class="card" aria-labelledby="total-projects-title">
                <div class="text">
                    <div id="total-projects-title" class="label">Total Projects</div>
                    <div class="value"><?= $total_projects ?? '0' ?></div>
                </div>
                <i class="fas fa-archive icon" aria-hidden="true"></i>
            </article>

            <article class="card" aria-labelledby="blog-posts-title">
                <div class="text">
                    <div id="blog-posts-title" class="label">Blog Posts</div>
                    <div class="value"><?= $total_posts ?? '0' ?></div>
                </div>
                <i class="fas fa-blog icon" aria-hidden="true"></i>
            </article>

            <article class="card" aria-labelledby="unread-messages-title">
                <div class="text">
                    <div id="unread-messages-title" class="label">Unread Messages</div>
                    <div class="value"><?= $unread_messages ?? '0' ?></div>
                </div>
                <i class="fas fa-envelope icon" aria-hidden="true"></i>
            </article>
        </section>

        <section class="sections" aria-label="Management links">
            <div class="section-card">
                <h5>Manage Projects</h5>
                <ul>
                    <li><a href="<?= base_url('admin/projects') ?>">📂 View All Projects</a></li>
                    <li><a href="<?= base_url('admin/projects/create') ?>">➕ Add New Project</a></li>
                </ul>
            </div>

            <div class="section-card">
                <h5>Manage Blog Posts</h5>
                <ul>
                    <li><a href="<?= base_url('admin/blogs') ?>">📝 View All Blogs</a></li>
                    <li><a href="<?= base_url('admin/blogs/create') ?>">➕ Add New Blog</a></li>
                </ul>
            </div>

            <div class="section-card" style="flex-basis: 100%;">
                <h5>Contact Messages</h5>
                <ul>
                    <li><a href="<?= base_url('admin/messages') ?>">📩 View Messages</a></li>
                </ul>
            </div>
        </section>
    </main>
</body>

</html>