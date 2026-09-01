<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Contact Us</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 40px;
        }

        .container {
            background: #fff;
            max-width: 600px;
            margin: auto;
            padding: 30px 40px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            color: #333;
        }

        label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
            margin-top: 20px;
        }

        input[type="text"],
        input[type="email"],
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            resize: vertical;
        }

        textarea {
            min-height: 120px;
        }

        button {
            background-color: #007bff;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 5px;
            margin-top: 20px;
            cursor: pointer;
            width: 100%;
            font-size: 16px;
        }

        button:hover {
            background-color: #0056b3;
        }

        .error-message {
            background-color: #f8d7da;
            color: #842029;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
            margin-bottom: 20px;
        }
    </style>
</head>

<body>

    <div class="container">
        <h1>Contact Us</h1>

        <?php if (isset($validation)): ?>
            <div class="error-message">
                <?= $validation->listErrors() ?>
            </div>
        <?php endif; ?>

        <form action="<?= site_url('contact/submit') ?>" method="post">
            <?= csrf_field() ?>

            <label for="name">Name</label>
            <input type="text" name="name" id="name" value="<?= set_value('name') ?>" required>

            <label for="email">Email</label>
            <input type="email" name="email" id="email" value="<?= set_value('email') ?>" required>

            <label for="message">Message</label>
            <textarea name="message" id="message" required><?= set_value('message') ?></textarea>

            <button type="submit">Send Message</button>
        </form>
    </div>

</body>

</html>