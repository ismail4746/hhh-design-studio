<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Edit Project: <?= esc($project['name']) ?></title>

    <!-- Bootstrap CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px 20px;
            max-width: 900px;
            margin: auto;
        }

        h1 {
            font-weight: 700;
            color: #1e2a38;
            margin-bottom: 30px;
            text-align: center;
        }

        form {
            background: #fff;
            padding: 25px 30px;
            border-radius: 10px;
            box-shadow: 0 6px 18px rgb(0 0 0 / 0.1);
            margin-bottom: 40px;
        }

        label {
            font-weight: 600;
            margin-bottom: 8px;
        }

        .form-control,
        select.form-control {
            border-radius: 6px;
            padding: 10px 12px;
            font-size: 1rem;
            border: 1.5px solid #ced4da;
            transition: border-color 0.3s ease;
        }

        .form-control:focus,
        select.form-control:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 8px rgb(13 110 253 / 0.25);
        }

        .btn-primary,
        .btn-success,
        .btn-danger {
            border-radius: 8px;
            padding: 10px 25px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgb(0 123 255 / 0.3);
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #0a58ca;
            box-shadow: 0 6px 16px rgb(10 88 202 / 0.5);
        }

        .btn-success:hover {
            background-color: #198754cc;
            box-shadow: 0 6px 16px rgb(25 135 84 / 0.5);
        }

        .btn-danger:hover {
            background-color: #bb2d3bcc;
            box-shadow: 0 6px 16px rgb(187 45 59 / 0.5);
        }

        .alert-danger,
        .alert-success {
            max-width: 700px;
            margin: 0 auto 30px auto;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            box-shadow: 0 4px 12px rgb(220 53 69 / 0.25);
        }

        .alert-success {
            box-shadow: 0 4px 12px rgb(25 135 84 / 0.25);
        }

        h3 {
            color: #333;
            margin-bottom: 25px;
            font-weight: 700;
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
            max-width: 150px;
            border-radius: 8px;
            border: 1px solid #ddd;
            padding: 4px;
        }
    </style>
</head>

<body>

    <h1>Edit Project: <?= esc($project['name']) ?></h1>

    <?php if (session()->getFlashdata('errors')): ?>
        <div class="alert alert-danger">
            <ul class="mb-0">
                <?php foreach (session()->getFlashdata('errors') as $error): ?>
                    <li><?= esc($error) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form action="<?= site_url('admin/projects/update/' . $project['id']) ?>" method="post" novalidate>
        <?= csrf_field() ?>

        <div class="mb-3">
            <label for="name" class="form-label">Project Name</label>
            <input type="text" name="name" id="name" class="form-control" value="<?= set_value('name', $project['name']) ?>" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="description" id="description" class="form-control" rows="4"><?= set_value('description', $project['description']) ?></textarea>
        </div>

        <div class="row g-3">
            <div class="col-md-6">
                <label for="start_date" class="form-label">Start Date</label>
                <input type="date" name="start_date" id="start_date" class="form-control" value="<?= set_value('start_date', $project['start_date']) ?>">
            </div>
            <div class="col-md-6">
                <label for="end_date" class="form-label">End Date</label>
                <input type="date" name="end_date" id="end_date" class="form-control" value="<?= set_value('end_date', $project['end_date']) ?>">
            </div>
        </div>

        <div class="mb-4 mt-3">
            <label for="status" class="form-label">Status</label>
            <select name="status" id="status" class="form-control" required>
                <option value="planned" <?= set_select('status', 'planned', $project['status'] == 'planned') ?>>Planned</option>
                <option value="in_progress" <?= set_select('status', 'in_progress', $project['status'] == 'in_progress') ?>>In Progress</option>
                <option value="completed" <?= set_select('status', 'completed', $project['status'] == 'completed') ?>>Completed</option>
                <option value="on_hold" <?= set_select('status', 'on_hold', $project['status'] == 'on_hold') ?>>On Hold</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Update Project</button>
    </form>

    <hr class="my-5" />

    <h3>Project Images</h3>

    <?php if (session()->getFlashdata('success')): ?>
        <div class="alert alert-success text-center">
            <?= session()->getFlashdata('success') ?>
        </div>
    <?php endif; ?>

    <form action="<?= site_url('admin/projects/' . $project['id'] . '/addImage') ?>" method="post" enctype="multipart/form-data" novalidate>
        <?= csrf_field() ?>

        <div class="mb-3">
            <label for="image" class="form-label">Upload Image</label>
            <input type="file" name="image" id="image" class="form-control" required>
        </div>

        <div class="mb-3">
            <label for="type" class="form-label">Image Type</label>
            <select name="image_type" id="type" class="form-control" required>
                <option value="">-- Select Type --</option>
                <option value="lobby">Lobby</option>
                <option value="bedrooms">Bedrooms</option>
                <option value="kitchen">Kitchen</option>
                <option value="interior">Interior</option>
                <option value="elevation">Elevation</option>
                <option value="landscape">Landscape</option>
                <option value="ceiling">Ceiling</option>
                <option value="lounge">Lounge</option>
                <option value="bar">Bar</option>
                <option value="top roof">Top Roof</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="caption" class="form-label">Caption (optional)</label>
            <input type="text" name="caption" id="caption" class="form-control" placeholder="Enter image caption">
        </div>


        <button type="submit" class="btn btn-success">Upload Image</button>
    </form>

    <table class="table table-bordered mt-4 align-middle">
        <thead>
            <tr>
                <th>Image</th>
                <th>Type</th>
                <th>Caption</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($images as $image): ?>
                <tr>
                    <td><img src="<?= base_url($image['image_url']) ?>" alt="Image" class="project-img"></td>
                    <td><?= isset($image['image_type']) ? esc(ucwords($image['image_type'])) : '<em>Not set</em>' ?></td>
                    <td><?= esc($image['caption']) ?></td>
                    <td>
                        <form action="<?= site_url('admin/projects/deleteImage/' . $image['id']) ?>" method="post" onsubmit="return confirm('Delete this image?');">
                            <?= csrf_field() ?>
                            <button class="btn btn-danger btn-sm">Delete</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>

    </table>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>