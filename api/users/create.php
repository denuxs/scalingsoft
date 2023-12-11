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

if (
    !isset($request['username']) ||
    !isset($request['password']) ||
    !isset($request['firstname']) ||
    !isset($request['lastname']) ||
    !isset($request['role'])
) {
    $response = [
        'error' => 'some fields are required'
    ];
    response_json($response, 400);
}

$user = User::findByUsername($request['username']);

if ($user) {
    $response = [
        'error' => 'Username found'
    ];
    response_json($response, 400);
}

$affected = User::create($request);

response_json(["ok" => $affected]);
