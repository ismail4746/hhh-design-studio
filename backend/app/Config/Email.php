<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Email extends BaseConfig
{
    public $fromEmail;
    public $fromName;
    public $recipients;
    public $protocol;
    public $SMTPHost;
    public $SMTPUser;
    public $SMTPPass;
    public $SMTPPort;
    public $SMTPCrypto;
    public $mailType;
    public $charset;
    public $wordWrap;

    public function __construct()
    {
        $this->fromEmail = env('MAIL_FROM_ADDRESS');
        $this->fromName  = env('MAIL_FROM_NAME');
        $this->protocol  = env('MAIL_MAILER');
        $this->SMTPHost  = env('MAIL_HOST');
        $this->SMTPUser  = env('MAIL_USERNAME');
        $this->SMTPPass  = env('MAIL_PASSWORD');
        $this->SMTPPort   = (int) env('MAIL_PORT');
        $this->SMTPCrypto = env('MAIL_ENCRYPTION');
        $this->mailType  = 'html';
        $this->charset   = 'utf-8';
        $this->wordWrap  = true;
    }
}
