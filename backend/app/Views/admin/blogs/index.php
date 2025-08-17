<style>
  /* Reset and base styles */
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f9fafb;
    color: #333;
    margin: 2rem;
  }

  h2 {
    font-weight: 700;
    font-size: 2rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
  }

  /* Primary Button */
  .btn-primary {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 0.5rem 1.25rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: inline-block;
    margin-bottom: 1.5rem;
    text-decoration: none;
  }
  .btn-primary:hover {
    background-color: #1e40af;
  }

  /* Alert */
  .alert {
    background-color: #d1fae5;
    color: #065f46;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  /* Table container with shadow and rounded corners */
  table.table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0,0,0,0.1);
    background-color: #fff;
  }

  /* Table header */
  thead.table-dark th {
    background: linear-gradient(90deg, #1e3a8a, #2563eb);
    color: white;
    font-weight: 700;
    padding: 1rem 1.25rem;
    text-align: left;
    letter-spacing: 0.05em;
    user-select: none;
  }

  /* Table rows */
  tbody tr {
    border-bottom: 1px solid #e2e8f0;
    transition: background-color 0.3s ease;
    cursor: default;
  }
  tbody tr:hover {
    background-color: #eff6ff;
  }

  /* Table cells */
  tbody td {
    padding: 0.9rem 1.25rem;
    vertical-align: middle;
    font-size: 0.95rem;
    color: #374151;
  }

  /* Images in cells */
  td img {
    border-radius: 8px;
    object-fit: cover;
    width: 100px;
    height: 60px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  /* No image text */
  .no-image {
    font-style: italic;
    color: #9ca3af;
    font-size: 0.9rem;
  }

  /* Buttons */
  .btn-sm {
    padding: 0.3rem 0.8rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.85rem;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
    user-select: none;
  }

  .btn-warning {
    background-color: #fbbf24;
    color: #78350f;
  }
  .btn-warning:hover {
    background-color: #b45309;
    color: white;
  }

  .btn-danger {
    background-color: #ef4444;
    color: white;
  }
  .btn-danger:hover {
    background-color: #b91c1c;
  }

  /* Action buttons container */
  .actions a + a {
    margin-left: 0.75rem;
  }

  /* Responsive */
  @media (max-width: 900px) {
    table.table,
    thead.table-dark,
    tbody tr,
    tbody td,
    thead.table-dark th {
      display: block;
      width: 100%;
    }
    thead.table-dark th {
      padding: 0.7rem 1rem;
      text-align: right;
      position: relative;
    }
    thead.table-dark th::after {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 100%;
      width: 1px;
      background-color: #cbd5e1;
    }
    tbody tr {
      margin-bottom: 1rem;
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 1rem;
    }
    tbody td {
      text-align: right;
      padding-left: 50%;
      position: relative;
      font-size: 0.9rem;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    tbody td::before {
      content: attr(data-label);
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      font-weight: 700;
      color: #374151;
      white-space: nowrap;
      font-size: 0.85rem;
    }
    td img {
      width: 80px;
      height: 50px;
    }
  }
</style>

<h2>All Blogs</h2>

<a href="<?= base_url('admin/blogs/create') ?>" class="btn-primary">Add New Blog</a>

<?php if (session()->getFlashdata('success')): ?>
  <div class="alert"><?= session()->getFlashdata('success') ?></div>
<?php endif; ?>

<table class="table" role="table" aria-label="All Blogs Table">
  <thead class="table-dark">
    <tr>
      <th scope="col">Thumbnail</th>
      <th scope="col">Title</th>
      <th scope="col">Slug</th>
      <th scope="col">Category</th>
      <th scope="col">Tags</th>
      <th scope="col">Created At</th>
      <th scope="col">Updated At</th>
      <th scope="col" style="width: 160px;">Actions</th>
    </tr>
  </thead>
  <tbody>
    <?php if (!empty($blogs)): ?>
      <?php foreach ($blogs as $blog): ?>
        <tr>
          <td data-label="Thumbnail">
            <?php if (!empty($blog['thumbnail'])): ?>
              <?php $url = base_url('uploads/blogs/' . $blog['thumbnail']); ?>
              <img src="<?= esc($url) ?>" alt="Thumbnail for <?= esc($blog['title']) ?>">
            <?php else: ?>
              <span class="no-image">No image uploaded</span>
            <?php endif; ?>
          </td>
          <td data-label="Title"><?= esc($blog['title']) ?></td>
          <td data-label="Slug"><?= esc($blog['slug']) ?></td>
          <td data-label="Category"><?= esc($blog['category']) ?></td>
          <td data-label="Tags"><?= esc($blog['tags']) ?></td>
          <td data-label="Created At"><?= date('Y-m-d', strtotime($blog['created_at'])) ?></td>
          <td data-label="Updated At"><?= date('Y-m-d', strtotime($blog['updated_at'])) ?></td>
          <td data-label="Actions" class="actions">
            <a href="<?= base_url('admin/blogs/edit/' . $blog['id']) ?>" class="btn-sm btn-warning" aria-label="Edit blog <?= esc($blog['title']) ?>">Edit</a>
            <a href="<?= base_url('admin/blogs/delete/' . $blog['id']) ?>" class="btn-sm btn-danger" aria-label="Delete blog <?= esc($blog['title']) ?>" onclick="return confirm('Delete this blog?')">Delete</a>
          </td>
        </tr>
      <?php endforeach; ?>
    <?php else: ?>
      <tr>
        <td colspan="8" class="text-center" style="font-style: italic; color: #9ca3af;">No blogs found.</td>
      </tr>
    <?php endif; ?>
  </tbody>
</table>
