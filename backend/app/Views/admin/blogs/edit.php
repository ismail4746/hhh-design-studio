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

  label {
    display: block;
    font-weight: 600;
    color: #495057;
    margin-bottom: 8px;
    font-size: 0.95rem;
  }

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
    min-height: 160px;
  }

  img.current-thumbnail {
    max-width: 150px;
    border-radius: 8px;
    display: block;
    margin-bottom: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  button[type="submit"] {
    background-color: #2563eb;
    border: none;
    font-weight: 700;
    padding: 12px 32px;
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.25s ease;
    margin-right: 12px;
  }

  button[type="submit"]:hover,
  button[type="submit"]:focus {
    background-color: #1e40af;
    outline: none;
  }

  a.back-link {
    font-weight: 700;
    padding: 12px 32px;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #e2e8f0;
    color: #374151;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.25s ease;
  }

  a.back-link:hover,
  a.back-link:focus {
    background-color: #cbd5e1;
    color: #1f2937;
    outline: none;
    text-decoration: none;
  }

  .form-actions {
    margin-top: 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .form-container {
      padding: 28px 24px;
    }

    .form-actions {
      flex-direction: column;
      gap: 12px;
    }

    button[type="submit"],
    a.back-link {
      width: 100%;
      text-align: center;
      margin-right: 0;
    }
  }
</style>

<div class="form-container">
  <h2>Edit Blog</h2>

  <?php if (session()->getFlashdata('errors')): ?>
    <div class="alert-danger" role="alert" aria-live="assertive">
      <?php foreach (session()->getFlashdata('errors') as $error): ?>
        <p><?= esc($error) ?></p>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>

  <form action="<?= base_url('admin/blogs/update/' . $blog['id']) ?>" method="post" enctype="multipart/form-data" novalidate>
    <?= csrf_field() ?>

    <label for="title">Title:</label>
    <input type="text" id="title" name="title" value="<?= old('title', $blog['title']) ?>" required aria-required="true" />

    <label for="slug">Slug:</label>
    <input type="text" id="slug" name="slug" value="<?= old('slug', $blog['slug']) ?>" readonly />

    <label for="content">Content:</label>
    <textarea id="content" name="content" rows="8" required aria-required="true"><?= old('content', $blog['content']) ?></textarea>

    <label for="category">Category:</label>
    <input type="text" id="category" name="category" value="<?= old('category', $blog['category']) ?>" />

    <label for="tags">Tags (comma separated):</label>
    <input type="text" id="tags" name="tags" value="<?= old('tags', $blog['tags']) ?>" />

    <label for="thumbnail">Thumbnail Image:</label>
    <?php if (!empty($blog['thumbnail'])): ?>
      <img src="<?= base_url('uploads/' . $blog['thumbnail']) ?>" alt="Current Thumbnail" class="current-thumbnail" />
    <?php endif; ?>
    <input type="file" id="thumbnail" name="thumbnail" accept="image/*" />

    <div class="form-actions">
      <button type="submit">Update Blog</button>
      <a href="<?= base_url('admin/blogs') ?>" class="back-link" role="button">Back</a>
    </div>
  </form>
</div>
