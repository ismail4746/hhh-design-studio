<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Create New Project</title>

    <!-- Bootstrap CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <style>
        body {
            background-color: #f8f9fa;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 40px 20px;
            max-width: 700px;
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

        .btn-primary {
            border-radius: 8px;
            padding: 10px 25px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgb(0 123 255 / 0.3);
            transition: all 0.3s ease;
            width: 100%;
            margin-top: 20px;
        }

        .btn-primary:hover {
            background-color: #0a58ca;
            box-shadow: 0 6px 16px rgb(10 88 202 / 0.5);
        }

        .alert-danger {
            max-width: 700px;
            margin: 0 auto 30px auto;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            box-shadow: 0 4px 12px rgb(220 53 69 / 0.25);
        }

        small.text-muted {
            font-size: 0.85rem;
            color: #6c757d;
        }
    </style>
</head>

<body>

    <h1>Create New Project</h1>

    <?php if (session()->getFlashdata('errors')): ?>
        <div class="alert alert-danger">
            <ul class="mb-0">
                <?php foreach (session()->getFlashdata('errors') as $error): ?>
                    <li><?= esc($error) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form action="<?= site_url('admin/projects/store') ?>" method="post" enctype="multipart/form-data" novalidate>
        <?= csrf_field() ?>

        <div class="mb-3">
            <label for="name" class="form-label">Project Name</label>
            <input type="text" name="name" id="name" class="form-control" value="<?= set_value('name') ?>" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea name="description" id="description" class="form-control" rows="4"><?= set_value('description') ?></textarea>
        </div>

        <div class="row g-3">
            <div class="col-md-6">
                <label for="start_date" class="form-label">Start Date</label>
                <input type="date" name="start_date" id="start_date" class="form-control" value="<?= set_value('start_date') ?>">
            </div>

            <div class="col-md-6">
                <label for="end_date" class="form-label">End Date</label>
                <input type="date" name="end_date" id="end_date" class="form-control" value="<?= set_value('end_date') ?>">
            </div>
        </div>

        <div class="mb-3 mt-3">
            <label class="form-label">Project Images & Types</label>
            <div id="image-upload-wrapper">
                <div class="image-upload-group mb-3 border rounded p-2">
                    <div class="row g-2 mb-2">
                        <div class="col-md-6">
                            <input type="file" name="images[]" class="form-control image-file-input" required>
                        </div>
                        <div class="col-md-5">
                            <select name="image_types[]" class="form-control" required>
                                <option value="">Select Type</option>
                                <option value="lobby">Lobby</option>
                                <option value="bedrooms">Bedrooms</option>
                                <option value="kitchen">Kitchen</option>
                                <option value="interior">Interior</option>
                                <option value="landscape">Landscape</option>
                                <option value="elevation">Elevation</option>
                                <option value="ceiling">Ceiling</option>
                                <option value="lounge">Lounge</option>
                                <option value="bar">Bar</option>
                                <option value="top roof">Top Roof</option>
                            </select>
                        </div>
                        <div class="col-md-1 d-flex align-items-center">
                            <button type="button" class="btn btn-danger btn-sm remove-image">✕</button>
                        </div>
                    </div>
                    <div class="row g-2">
                        <div class="col-md-10">
                            <input type="text" name="captions[]" class="form-control caption-input" placeholder="Caption (optional)">
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-outline-primary btn-sm ai-caption-btn w-100 text-nowrap" disabled>AI Generate</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" id="add-image" class="btn btn-secondary btn-sm mt-2">+ Add Another Image</button>
        </div>


        <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select name="status" id="status" class="form-control" required>
                <option value="planned" <?= set_select('status', 'planned') ?>>Planned</option>
                <option value="in_progress" <?= set_select('status', 'in_progress') ?>>In Progress</option>
                <option value="completed" <?= set_select('status', 'completed') ?>>Completed</option>
                <option value="on_hold" <?= set_select('status', 'on_hold') ?>>On Hold</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Create Project</button>
    </form>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const GROQ_API_KEY = '<?= env('GROQ_API_KEY') ?>';

        document.getElementById('add-image').addEventListener('click', function () {
            const wrapper = document.getElementById('image-upload-wrapper');
            const newGroup = document.createElement('div');
            newGroup.classList.add('image-upload-group', 'mb-3', 'border', 'rounded', 'p-2');
            newGroup.innerHTML = `
                <div class="row g-2 mb-2">
                    <div class="col-md-6">
                        <input type="file" name="images[]" class="form-control image-file-input" required>
                    </div>
                    <div class="col-md-5">
                        <select name="image_types[]" class="form-control" required>
                            <option value="">Select Type</option>
                            <option value="lobby">Lobby</option>
                            <option value="bedrooms">Bedrooms</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="interior">Interior</option>
                            <option value="landscape">Landscape</option>
                            <option value="elevation">Elevation</option>
                            <option value="ceiling">Ceiling</option>
                            <option value="lounge">Lounge</option>
                            <option value="bar">Bar</option>
                            <option value="top roof">Top Roof</option>
                        </select>
                    </div>
                    <div class="col-md-1 d-flex align-items-center">
                        <button type="button" class="btn btn-danger btn-sm remove-image">✕</button>
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col-md-10">
                        <input type="text" name="captions[]" class="form-control caption-input" placeholder="Caption (optional)">
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="btn btn-outline-primary btn-sm ai-caption-btn w-100 text-nowrap" disabled>AI Generate</button>
                    </div>
                </div>
            `;
            wrapper.appendChild(newGroup);
        });

        document.addEventListener('change', function (e) {
            if (e.target && e.target.classList.contains('image-file-input')) {
                const group = e.target.closest('.image-upload-group');
                const aiBtn = group.querySelector('.ai-caption-btn');
                aiBtn.disabled = !e.target.files.length;
            }
        });

        document.addEventListener('click', function (e) {
            if (e.target && e.target.classList.contains('remove-image')) {
                e.target.closest('.image-upload-group').remove();
            }
            if (e.target && e.target.classList.contains('ai-caption-btn')) {
                handleAiGenerate(e.target);
            }
        });

        async function handleAiGenerate(btn) {
            const group = btn.closest('.image-upload-group');
            const fileInput = group.querySelector('.image-file-input');
            const captionInput = group.querySelector('.caption-input');
            const file = fileInput.files[0];
            if (!file) return;

            btn.disabled = true;
            const original = btn.textContent;
            btn.textContent = '...';

            try {
                const base64 = await fileToBase64(file);
                const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + GROQ_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
                        messages: [{
                            role: 'user',
                            content: [
                                { type: 'image_url', image_url: { url: 'data:' + file.type + ';base64,' + base64 } },
                                { type: 'text', text: 'This is an interior design project image. Write a short descriptive caption (max 8 words). Reply with ONLY the caption text, nothing else.' }
                            ]
                        }],
                        max_tokens: 30
                    })
                });

                const data = await res.json();
                if (data.choices && data.choices[0]) {
                    captionInput.value = data.choices[0].message.content.trim();
                    btn.textContent = 'Done!';
                    setTimeout(function () { btn.textContent = original; btn.disabled = false; }, 1500);
                    return;
                } else {
                    throw new Error((data.error && data.error.message) || 'No response from AI');
                }
            } catch (err) {
                alert('AI Error: ' + err.message);
                btn.textContent = original;
                btn.disabled = false;
            }
        }

        function fileToBase64(file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader();
                reader.onload = function () { resolve(reader.result.split(',')[1]); };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
    </script>

</body>

</html>