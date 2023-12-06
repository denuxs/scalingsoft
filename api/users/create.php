<?php
require "../vendor/autoload.php";
require "../bootstrap.php";

use App\Models\User;

validate($request);

$affected = User::create($request);

response_json([]);
