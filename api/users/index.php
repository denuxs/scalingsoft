<?php
require "../vendor/autoload.php";
require "../bootstrap.php";

use App\Models\User;

$users = User::all();

response_json($users);
