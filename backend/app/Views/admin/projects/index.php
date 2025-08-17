<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Projects Management</title>

    <!-- Bootstrap CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px 20px;
        }

        h1 {
            font-weight: 700;
            color: #1e2a38;
            margin-bottom: 25px;
            text-align: center;
        }

        .btn-primary {
            border-radius: 8px;
            padding: 10px 20px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgb(13 110 253 / 0.3);
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #0a58ca;
            box-shadow: 0 6px 16px rgb(10 88 202 / 0.5);
        }

        .alert-success {
            max-width: 700px;
            margin: 0 auto 30px auto;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            box-shadow: 0 4px 12px rgb(25 135 84 / 0.25);
        }

        table {
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgb(0 0 0 / 0.1);
            overflow: hidden;
        }

        thead {
            background-color: #0d6efd;
            color: white;
        }

        thead th {
            font-weight: 600;
            text-align: center;
            vertical-align: middle;
        }

        tbody td {
            vertical-align: middle;
            text-align: center;
        }

        tbody tr:hover {
            background-color: #e9f0ff;
            transition: background-color 0.3s ease;
        }

        img.project-img {
            width: 80px;
            height: auto;
            margin-right: 6px;
            border-radius: 6px;
            border: 1px solid #ddd;
            padding: 3px;
            object-fit: cover;
        }

        .actions form {
            display: inline-block;
        }

        .btn-warning,
        .btn-danger {
            border-radius: 6px;
            font-size: 0.85rem;
            padding: 6px 10px;
            margin-bottom: 4px;
            box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
            transition: all 0.2s ease;
        }

        .btn-warning:hover {
            background-color: #e0a800;
            box-shadow: 0 4px 14px rgb(224 168 0 / 0.4);
            color: #fff;
        }

        .btn-danger:hover {
            background-color: #bb2d3b;
            box-shadow: 0 4px 14px rgb(187 45 59 / 0.5);
            color: #fff;
        }

        @media (max-width: 992px) {
            table,
            thead,
            tbody,
            th,
            td,
            tr {
                display: block;
            }

            thead tr {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            tbody tr {
                margin-bottom: 20px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
                background: white;
                padding: 15px;
            }

            tbody td {
                border: none;
                padding-left: 50%;
                text-align: left;
                position: relative;
                white-space: normal;
            }

            tbody td::before {
                position: absolute;
                left: 20px;
                width: 45%;
                white-space: nowrap;
                font-weight: 700;
                color: #0d6efd;
            }

            tbody td:nth-of-type(1)::before {
                content: "ID";
            }

            tbody td:nth-of-type(2)::before {
                content: "Name";
            }

            tbody td:nth-of-type(3)::before {
                content: "Description";
            }

            tbody td:nth-of-type(4)::before {
                content: "Start Date";
            }

            tbody td:nth-of-type(5)::before {
                content: "End Date";
            }

            tbody td:nth-of-type(6)::before {
                content: "Status";
            }

            tbody td:nth-of-type(7)::before {
                content: "Created At";
            }

            tbody td:nth-of-type(8)::before {
                content: "Updated At";
            }

            tbody td:nth-of-type(9)::before {
                content: "Images";
            }

            tbody td:nth-of-type(10)::before {
                content: "Actions";
            }

            img.project-img {
                width: 60px;
                margin-bottom: 8px;
            }
        }
    </style>
</head>

<body>

    <h1>Projects</h1>

    <?php if (session()->getFlashdata('success')): ?>
        <div class="alert alert-success text-center">
            <?= session()->getFlashdata('success') ?>
        </div>
    <?php endif; ?>

    <div class="d-flex justify-content-center mb-4">
        <a href="<?= site_url('admin/projects/create') ?>" class="btn btn-primary">Add New Project</a>
    </div>

    <div class="table-responsive">
        <table class="table table-bordered table-striped align-middle">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Images</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($projects as $project): ?>
                    <tr>
                        <td><?= esc($project['id']) ?></td>
                        <td><?= esc($project['name']) ?></td>
                        <td><?= esc($project['description']) ?></td>
                        <td><?= esc($project['start_date']) ?></td>
                        <td><?= esc($project['end_date']) ?></td>
                        <td><?= esc($project['status']) ?></td>
                        <td><?= esc($project['created_at']) ?></td>
                        <td><?= esc($project['updated_at']) ?></td>
                        <td>
                            <?php if (!empty($project['images'])): ?>
                                <?php foreach ($project['images'] as $image): ?>
                                    <img src="<?= base_url($image['image_url']) ?>" alt="<?= esc($image['caption']) ?>" class="project-img" />
                                <?php endforeach; ?>
                            <?php else: ?>
                                <em>No images</em>
                            <?php endif; ?>
                        </td>
                        <td class="actions">
                            <a href="<?= site_url('admin/projects/edit/' . $project['id']) ?>" class="btn btn-sm btn-warning mb-1">Edit</a>
                            <form action="<?= site_url('admin/projects/delete/' . $project['id']) ?>" method="post" style="display:inline;"
                                onsubmit="return confirm('Are you sure you want to delete this project?');">
                                <?= csrf_field() ?>
                                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>
