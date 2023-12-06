<?php
require "../vendor/autoload.php";
require "../bootstrap.php";

use App\Models\Role;

$users = Role::all();

response_json($users);
