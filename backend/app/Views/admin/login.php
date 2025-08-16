<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 50px;
            max-width: 400px;
            margin: auto;
        }
        form {
            background: #f4f4f4;
            padding: 20px;
            border-radius: 8px;
        }
        input[type="email"],
        input[type="password"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0 20px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
        button {
            padding: 10px;
            width: 100%;
            background: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
        }
        .message {
            margin-bottom: 15px;
        }
        .error {
            color: red;
        }
        .success {
            color: green;
        }
    </style>
</head>
<body>

    <h2>Admin Login</h2>

    <!-- Flash success message -->
    <?php if (session()->getFlashdata('success')): ?>
        <div class="message success"><?= session()->getFlashdata('success') ?></div>
    <?php endif; ?>

    <!-- Flash error message -->
    <?php if (session()->getFlashdata('error')): ?>
        <div class="message error"><?= session()->getFlashdata('error') ?></div>
    <?php endif; ?>

    <!-- Validation errors -->
    <?php if (isset($validation)): ?>
        <div class="message error">
            <?= $validation->listErrors() ?>
        </div>
    <?php endif; ?>

    <form action="<?= site_url('admin/login') ?>" method="post">
        <?= csrf_field() ?>

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" value="<?= old('email') ?>" required>

        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>

        <button type="submit">Login</button>
    </form>

</body>
</html>
