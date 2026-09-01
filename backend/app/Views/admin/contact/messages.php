<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin - Contact Messages</title>
    <style>
        /* Reset & base */
        *, *::before, *::after {
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            padding: 40px 20px;
            margin: 0;
            color: #212529;
            line-height: 1.5;
        }

        h1 {
            text-align: center;
            margin-bottom: 32px;
            color: #212529;
            font-weight: 700;
            font-size: 2rem;
        }

        .container {
            max-width: 1140px;
            margin-left: auto;
            margin-right: auto;
            background: #fff;
            padding: 30px 40px;
            border-radius: 8px;
            box-shadow: 0 4px 18px rgb(0 0 0 / 0.1);
            overflow-x: auto;
        }

        /* Alerts */
        .alert-success, .alert-error {
            padding: 12px 20px;
            margin-bottom: 25px;
            border-radius: 5px;
            font-weight: 600;
            font-size: 1rem;
            max-width: 100%;
        }

        .alert-success {
            color: #155724;
            background-color: #d4edda;
            border: 1.5px solid #c3e6cb;
        }

        .alert-error {
            color: #721c24;
            background-color: #f8d7da;
            border: 1.5px solid #f5c6cb;
        }

        /* Table */
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
            min-width: 720px;
        }

        th, td {
            padding: 14px 18px;
            border: 1px solid #dee2e6;
            vertical-align: top;
            text-align: left;
        }

        th {
            background-color: #0d6efd; /* Bootstrap Primary Blue */
            color: white;
            font-weight: 600;
            user-select: none;
        }

        tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        /* Textarea */
        textarea {
            width: 100%;
            padding: 10px 14px;
            resize: vertical;
            border-radius: 5px;
            border: 1.5px solid #ced4da;
            font-family: inherit;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        textarea:focus {
            border-color: #0d6efd;
            outline: none;
            box-shadow: 0 0 5px rgba(13, 110, 253, 0.5);
        }

        /* Button */
        button {
            background-color: #198754; /* Bootstrap Success Green */
            color: white;
            border: none;
            padding: 10px 18px;
            margin-top: 8px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }

        button:hover,
        button:focus {
            background-color: #157347;
            outline: none;
        }

        /* Misc */
        em {
            color: #6c757d;
            font-style: italic;
        }

        small {
            color: #adb5bd;
            font-size: 0.85rem;
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
            body {
                padding: 20px 10px;
            }

            .container {
                padding: 20px 25px;
            }

            table {
                font-size: 0.85rem;
                min-width: unset;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Contact Messages (Admin)</h1>

        <?php if (session()->getFlashdata('success')): ?>
            <div class="alert-success"><?= session()->getFlashdata('success') ?></div>
        <?php endif; ?>

        <?php if (session()->getFlashdata('error')): ?>
            <div class="alert-error"><?= session()->getFlashdata('error') ?></div>
        <?php endif; ?>

        <table role="grid" aria-describedby="contact-messages-table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                    <th scope="col">Submitted At</th>
                    <th scope="col">Reply</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($messages as $msg): ?>
                    <tr>
                        <td><?= esc($msg['id']) ?></td>
                        <td><?= esc($msg['name']) ?></td>
                        <td><a href="mailto:<?= esc($msg['email']) ?>" style="color:#0d6efd; text-decoration:underline;"><?= esc($msg['email']) ?></a></td>
                        <td style="white-space: pre-wrap;"><?= nl2br(esc($msg['message'])) ?></td>
                        <td><?= esc($msg['submitted_at']) ?></td>
                        <td>
                            <?php if ($msg['reply']): ?>
                                <strong>Replied:</strong><br />
                                <div style="white-space: pre-wrap;"><?= nl2br(esc($msg['reply'])) ?></div>
                                <small><i><?= esc($msg['replied_at']) ?></i></small>
                            <?php else: ?>
                                <em>Not replied yet</em>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if (!$msg['reply']): ?>
                                <form action="<?= site_url('admin/messages/reply/' . $msg['id']) ?>" method="post" novalidate>
                                    <?= csrf_field() ?>
                                    <label for="reply-<?= esc($msg['id']) ?>" class="sr-only">Reply to message #<?= esc($msg['id']) ?></label>
                                    <textarea id="reply-<?= esc($msg['id']) ?>" name="reply" rows="3" placeholder="Write reply here..." required></textarea>
                                    <button type="submit">Send Reply</button>
                                </form>
                            <?php else: ?>
                                <em>Reply sent</em>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <?php if (empty($messages)): ?>
                    <tr>
                        <td colspan="7" style="text-align:center; font-style: italic; color: #6c757d;">No contact messages found.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</body>

</html>
