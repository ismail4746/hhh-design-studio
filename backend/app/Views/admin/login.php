<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Login</title>

    <!-- Bootstrap CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
        body {
            background-color: #f5f7fa;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-container {
            background: #ffffff;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }

        h2 {
            margin-bottom: 30px;
            font-weight: 700;
            color: #1e2a38;
            text-align: center;
        }

        label {
            font-weight: 600;
            color: #333;
        }

        .form-control:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }

        button.btn-primary {
            width: 100%;
            padding: 12px;
            font-weight: 600;
            font-size: 1.1rem;
            border-radius: 8px;
        }

        .message {
            margin-bottom: 20px;
            padding: 12px 15px;
            border-radius: 8px;
            font-weight: 500;
        }

        .success {
            background-color: #d1e7dd;
            color: #0f5132;
            border: 1px solid #badbcc;
        }

        .error {
            background-color: #f8d7da;
            color: #842029;
            border: 1px solid #f5c2c7;
        }

        /* Optional: make validation errors list cleaner */
        .error ul {
            margin: 0;
            padding-left: 20px;
        }
    </style>
</head>

<body>

    <div class="login-container">
        <h2>Admin Login</h2>

        <!-- Flash success message -->
        <?php if (session()->getFlashdata('success')): ?>
            <div class="message success" role="alert">
                <?= session()->getFlashdata('success') ?>
            </div>
        <?php endif; ?>

        <!-- Flash error message -->
        <?php if (session()->getFlashdata('error')): ?>
            <div class="message error" role="alert">
                <?= session()->getFlashdata('error') ?>
            </div>
        <?php endif; ?>

        <!-- Validation errors -->
        <?php if (isset($validation)): ?>
            <div class="message error" role="alert">
                <?= $validation->listErrors() ?>
            </div>
        <?php endif; ?>

        <form action="<?= site_url('admin/login') ?>" method="post" novalidate>
            <?= csrf_field() ?>

            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" value="<?= old('email') ?>" required />
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required />
            </div>

            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>

</html>
