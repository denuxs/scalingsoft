<?php

if (!function_exists('mysqli_init') && !extension_loaded('mysqli')) {
    echo 'We don\'t have mysqli!!!';
    exit();
}

define('ROOT_DIR', __DIR__);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: http://localhost:5173'); // CORS
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$json = file_get_contents('php://input');
$request = json_decode($json, true);

function create_log($message)
{
    date_default_timezone_set('America/Managua');
    $time = date('F j, Y, g:i a e O');
    $message = "[{$time}] {$message} \n";

    error_log($message, 3, 'logs/errors.log');
    die();
}

function custom_error_handler($error_no, $error_msg)
{
    $message = "Error: [$error_no] $error_msg";
    create_log($message);
}
set_error_handler("custom_error_handler");

function custom_exception_handler(Exception $ex)
{
    create_log($ex->getMessage());
}
set_exception_handler("custom_exception_handler");

function response_json(array $data, int $status = 200)
{
    http_response_code($status);
    if ($data) {
        echo json_encode($data);
    }
    exit();
}

function custom_error_log($data)
{
    error_log(print_r($data, true));
}

function validate($request)
{
    $errors = [];
    foreach ($request as $key => $value) {
        if (!isset($request[$key]) || empty($request[$key])) {
            $errors[$key] = "$key required";
        }
    }

    if (count($errors)) {
        response_json($errors, 400);
    }
}
