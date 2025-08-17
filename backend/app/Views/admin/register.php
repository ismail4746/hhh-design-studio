<!DOCTYPE html>
<html>
<head>
    <title>Admin Register</title>
</head>
<body>

    <h2>Admin Registration</h2>

    <?php if (session()->getFlashdata('success')): ?>
        <p style="color: green;"><?= session()->getFlashdata('success') ?></p>
    <?php endif; ?>

    <?php if (session()->getFlashdata('errors')): ?>
        <div style="color: red;">
            <?php foreach (session()->getFlashdata('errors') as $error): ?>
                <p><?= esc($error) ?></p>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <form action="<?= site_url('admin/register') ?>" method="post">
        <?= csrf_field() ?>

        <label>Name:</label><br>
        <input type="text" name="name" value="<?= old('name') ?>"><br><br>

        <label>Email:</label><br>
        <input type="email" name="email" value="<?= old('email') ?>"><br><br>

        <label>Password:</label><br>
        <input type="password" name="password"><br><br>

        <label>Confirm Password:</label><br>
        <input type="password" name="confirm_password"><br><br>

        <button type="submit">Register</button>
    </form>

    <p><a href="<?= site_url('admin/login') ?>">Already have an account? Login here</a></p>

</body>
</html>
