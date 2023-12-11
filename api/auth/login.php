<?php
require "../vendor/autoload.php";
require "../bootstrap.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit();
}

use App\Models\User;

$json = file_get_contents('php://input');
$request = json_decode($json, true);

if (!isset($request['username']) || !isset($request['password'])) {
    $response = [
        'error' => 'some fields are required'
    ];
    response_json($response, 400);
}

$MAXATTEMPTS = 2;

$user = User::findByUsername($request['username']);

if (!$user) {
    $response = [
        'error' => 'Username not found or inactive'
    ];
    response_json($response, 404);
}

if ($user->attempts > $MAXATTEMPTS) {
    $response = [
        'error' => 'Login failed after 3 attempts'
    ];
    response_json($response, 401);
}

$auth = password_verify($request['password'], $user->password);

if (!$auth) {
    $attempts = $user->attempts + 1;

    User::updateAttempts($attempts, $user->userId);

    $response = [
        'error' => 'Password incorrect'
    ];
    response_json($response, 400);
}

$payload = [
    'username' => $user->username,
    'role' => $user->roleName,
    'role_id' => $user->roleId,
];

response_json([
    "token" => base64_encode(json_encode($payload)),
    "user" => $payload
]);
