<?php

/**
 * The goal of this file is to allow developers a location
 * where they can overwrite core procedural functions and
 * replace them with their own. This file is loaded during
 * the bootstrap process and is called during the framework's
 * execution.
 *
 * This can be looked at as a `master helper` file that is
 * loaded early on, and may also contain additional functions
 * that you'd like to use throughout your entire application
 *
 * @see: https://codeigniter.com/user_guide/extending/common.html
 */

// Handle CORS for API requests
// Use an allowlist so requests from Google (www) and direct site work.
$allowedOrigins = [
    'https://hhhdesignstudio.com',
    'https://www.hhhdesignstudio.com',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    // Tell caches that responses vary by Origin
    header('Vary: Origin');
} elseif (empty($origin)) {
    // No Origin header (direct navigation or same-origin). Do not set Access-Control-Allow-Origin
    // so browsers treat it as same-origin for navigation. API fetches should send Origin.
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // A preflight should return quickly
    http_response_code(200);
    exit();
}
