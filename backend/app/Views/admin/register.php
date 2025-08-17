<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin Registration</title>

    <!-- Bootstrap CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
        body {
            background: #f0f2f5;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .register-container {
            background: #ffffff;
            padding: 40px 30px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 420px;
        }

        h2 {
            font-weight: 700;
            margin-bottom: 25px;
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

        .btn-primary {
            width: 100%;
            font-weight: 600;
            padding: 12px;
            border-radius: 8px;
            font-size: 1.1rem;
        }

        .text-center a {
            color: #0d6efd;
            text-decoration: none;
            font-weight: 500;
        }

        .text-center a:hover {
            text-decoration: underline;
        }

        .alert {
            border-radius: 8px;
            font-weight: 500;
        }
    </style>
</head>

<body>

    <div class="register-container">
        <h2>Admin Registration</h2>

        <!-- Success message -->
        <?php if (session()->getFlashdata('success')) : ?>
            <div class="alert alert-success alert-dismissible fade show" role="alert" id="successAlert">
                <?= session()->getFlashdata('success') ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>

        <!-- Error messages -->
        <?php if (session()->getFlashdata('errors')) : ?>
            <div class="alert alert-danger alert-dismissible fade show" role="alert" id="errorAlert">
                <ul class="mb-0 ps-3">
                    <?php foreach (session()->getFlashdata('errors') as $error) : ?>
                        <li><?= esc($error) ?></li>
                    <?php endforeach; ?>
                </ul>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>

        <form action="<?= site_url('admin/register') ?>" method="post" novalidate>
            <?= csrf_field() ?>

            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" value="<?= old('name') ?>" required />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" value="<?= old('email') ?>" required />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" required />
            </div>

            <div class="mb-4">
                <label for="confirm_password" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirm_password" name="confirm_password" required />
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
        </form>

        <p class="text-center mt-4">
            Already have an account?
            <a href="<?= site_url('admin/login') ?>">Login here</a>
        </p>
    </div>

    <!-- Bootstrap JS Bundle CDN (Popper + Bootstrap JS) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        // Optional: auto dismiss alerts after 8 seconds
        setTimeout(() => {
            const successAlert = document.getElementById('successAlert');
            if (successAlert) {
                const alert = bootstrap.Alert.getOrCreateInstance(successAlert);
                alert.close();
            }
            const errorAlert = document.getElementById('errorAlert');
            if (errorAlert) {
                const alert = bootstrap.Alert.getOrCreateInstance(errorAlert);
                alert.close();
            }
        }, 8000);
    </script>

</body>

</html>
