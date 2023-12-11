<?php
require "../vendor/autoload.php";
require "../bootstrap.php";

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    exit();
}

use App\Models\User;

$users = User::all();

response_json($users);
