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

if (!isset($request['status']) || !isset($request['id'])) {
    $response = [
        'error' => 'some fiels are required'
    ];
    response_json($response, 400);
}

$affected = User::updateStatus($request['id'], $request['status']);

response_json(["ok" => $affected]);
