<style>
    body {
        background-color: #f8f9fa;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        padding: 40px 15px;
        display: flex;
        justify-content: center;
        min-height: 100vh;
        align-items: center;
    }

    .form-container {
        background: #ffffff;
        padding: 36px 48px;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        width: 100%;
    }

    h2 {
        font-weight: 700;
        color: #212529;
        margin-bottom: 32px;
        text-align: center;
        font-size: 1.9rem;
        letter-spacing: 0.04em;
    }

    .form-label {
        display: block;
        font-weight: 600;
        color: #495057;
        margin-bottom: 8px;
        font-size: 0.95rem;
    }

    /* Form controls styling */
    input[type="text"],
    textarea,
    input[type="file"] {
        width: 100%;
        padding: 12px 14px;
        font-size: 1rem;
        color: #495057;
        background-color: #fefefe;
        border: 1.8px solid #ced4da;
        border-radius: 8px;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
        box-sizing: border-box;
        font-family: inherit;
    }

    input[type="text"]:focus,
    textarea:focus,
    input[type="file"]:focus {
        border-color: #2563eb;
        outline: none;
        box-shadow: 0 0 6px rgba(37, 99, 235, 0.5);
        background-color: #fff;
    }

    textarea {
        resize: vertical;
        min-height: 140px;
    }

    /* Button styles */
    .btn-primary {
        background-color: #2563eb;
        border: none;
        font-weight: 700;
        padding: 12px 32px;
        border-radius: 8px;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.25s ease;
    }

    .btn-primary:hover,
    .btn-primary:focus {
        background-color: #1e40af;
        outline: none;
    }

    .btn-secondary {
        font-weight: 700;
        padding: 12px 32px;
        border-radius: 8px;
        font-size: 1rem;
        background-color: #e2e8f0;
        border: none;
        color: #374151;
        cursor: pointer;
        transition: background-color 0.25s ease;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .btn-secondary:hover,
    .btn-secondary:focus {
        background-color: #cbd5e1;
        color: #1f2937;
        outline: none;
        text-decoration: none;
    }

    /* Alert */
    .alert-danger {
        border-radius: 10px;
        padding: 18px 24px;
        margin-bottom: 28px;
        color: #842029;
        background-color: #f8d7da;
        border: 1.5px solid #f5c2c7;
        font-weight: 600;
        font-size: 0.95rem;
        line-height: 1.3;
    }

    .alert-danger p {
        margin: 0 0 6px 0;
    }

    /* Spacing */
    .mb-4 {
        margin-bottom: 1.5rem;
    }

    .mb-5 {
        margin-bottom: 2rem;
    }

    /* Flex container for buttons */
    .d-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
    }

    @media (max-width: 480px) {
        .form-container {
            padding: 28px 24px;
        }

        .d-flex {
            flex-direction: column;
            gap: 12px;
        }

        .btn-primary,
        .btn-secondary {
            width: 100%;
            text-align: center;
        }
    }
</style>

<div class="form-container">
    <h2>Create New Blog</h2>

    <?php if (session()->getFlashdata('errors')): ?>
        <div class="alert alert-danger" role="alert" aria-live="assertive">
            <?php foreach (session()->getFlashdata('errors') as $error): ?>
                <p><?= esc($error) ?></p>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <form action="<?= base_url('admin/blogs/store') ?>" method="post" enctype="multipart/form-data" novalidate>
        <?= csrf_field() ?>

        <div class="mb-4">
            <label for="title" class="form-label">Title:</label>
            <input type="text" id="title" name="title" class="form-control" value="<?= old('title') ?>" required aria-required="true" aria-describedby="titleHelp" />
        </div>

        <div class="mb-4">
            <label for="content" class="form-label">Content:</label>
            <textarea id="content" name="content" rows="6" class="form-control" required aria-required="true"></textarea>
        </div>

        <div class="mb-4">
            <label for="category" class="form-label">Category:</label>
            <input type="text" id="category" name="category" class="form-control" value="<?= old('category') ?>" />
        </div>

        <div class="mb-4">
            <label for="tags" class="form-label">Tags (comma separated):</label>
            <input type="text" id="tags" name="tags" class="form-control" value="<?= old('tags') ?>" />
        </div>

        <div class="mb-5">
            <label for="thumbnail" class="form-label">Upload Thumbnail Image:</label>
            <input type="file" id="thumbnail" name="thumbnail" class="form-control" accept="image/*" />
        </div>


        <div class="d-flex">
            <button type="submit" class="btn-primary">Create Blog</button>
            <a href="<?= base_url('admin/blogs') ?>" class="btn-secondary" role="button">Back</a>
        </div>
    </form>
</div>