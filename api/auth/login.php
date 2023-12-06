<?php
require "../vendor/autoload.php";
require "../bootstrap.php";

use App\Models\User;

validate($request);

$user = User::findByUsername($request['username']);

if (!$user) {
    $response = [
        'error' => 'Username not found or inactive'
    ];
    response_json($response, 400);
}

$auth = password_verify($request['password'], $user->password);

if (!$auth) {
    $response = [
        'error' => 'Password incorrect'
    ];
    response_json($response, 400);
}

$payload = [
    'username' => $user->user_name,
    'role_id' => $user->roleId,
];

response_json([
    "token" => base64_encode(json_encode($payload)),
    "user" => $payload
]);
