<?php

namespace App\Controllers\Admin;

use App\Controllers\BaseController;
use App\Models\ContactMessageModel;

class ContactController extends BaseController
{
    protected $messageModel;

    public function __construct()
    {
        $this->messageModel = new ContactMessageModel();
        helper(['form', 'url', 'email']);
    }

    public function messages()
    {
        $data['messages'] = $this->messageModel
            ->orderBy('submitted_at', 'DESC')
            ->findAll();

        return view('admin/contact/messages', $data);
    }


    // public function reply($id)
    // {
    //     $message = $this->messageModel->find($id);

    //     if (!$message) {
    //         return redirect()->back()->with('error', 'Message not found');
    //     }

    //     $replyText = $this->request->getPost('reply');

    //     if (!$replyText) {
    //         return redirect()->back()->with('error', 'Reply cannot be empty');
    //     }

    //     // Update DB
    //     $this->messageModel->update($id, [
    //         'reply'       => $replyText,
    //         'replied_at'  => date('Y-m-d H:i:s'),
    //         'read_status' => 1,
    //     ]);

    //     // Send reply via email
    //     $email = \Config\Services::email();
    //     $email->setTo($message['email']);
    //     $email->setFrom('admin@yourdomain.com', 'Site Admin');
    //     $email->setSubject('Reply to your message');
    //     $email->setMessage("
    //         Hello " . esc($message['name']) . ",<br><br>
    //         Thanks for your message. Here's our reply:<br><br>
    //         " . nl2br(esc($replyText)) . "<br><br>
    //         Best regards,<br>Your Company");

    //     $email->send();

    //     return redirect()->back()->with('success', 'Reply sent successfully');
    // }

    public function reply($id)
    {
        $message = $this->messageModel->find($id);
        if (!$message) {
            return redirect()->back()->with('error', 'Message not found');
        }

        $replyText = $this->request->getPost('reply');
        if (!$replyText) {
            return redirect()->back()->with('error', 'Reply cannot be empty');
        }

        $this->messageModel->update($id, [
            'reply' => $replyText,
            'replied_at' => date('Y-m-d H:i:s'),
            'read_status' => 1
        ]);

        $email = \Config\Services::email();

        $email->setTo($message['email']);
        $email->setFrom('admin@yourdomain.com', 'HHH Architect Design');
        $email->setSubject('Reply to your message');

        $body = "Hello " . esc($message['name']) . ",<br><br>"
            . "Thanks for contacting us. Here is our reply:<br><br>"
            . nl2br(esc($replyText)) . "<br><br>"
            . "Best Regards,<br>HHH Architect Design";

        $email->setMessage($body);

        if ($email->send()) {
            return redirect()->back()->with('success', 'Reply sent successfully and email delivered.');
        } else {
            return redirect()->back()->with('error', 'Reply saved but failed to send email.');
        }
    }

    public function submitMessage()
    {
        if (!$this->request->is('post')) {
            return $this->response->setJSON([
                'status'  => 'error',
                'message' => 'Invalid request'
            ])->setStatusCode(405);
        }

        $data = $this->request->getJSON(true);

        $rules = [
            'name'    => 'required|min_length[3]',
            'email'   => 'required|valid_email',
            'message' => 'required|min_length[5]'
        ];

        if (!$this->validateData($data, $rules)) {
            return $this->response->setJSON([
                'status' => 'error',
                'errors' => $this->validator->getErrors()
            ])->setStatusCode(400);
        }

        $this->messageModel->insert([
            'name'         => $data['name'],
            'email'        => $data['email'],
            'message'      => $data['message'],
            'read_status'  => 0,
            'submitted_at' => date('Y-m-d H:i:s'),
        ]);

        return $this->response->setJSON([
            'status'  => 'success',
            'message' => 'Message submitted successfully'
        ]);
    }
}
