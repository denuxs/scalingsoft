<?php

namespace App\Models;

class Database
{
    public static function connect()
    {
        include ROOT_DIR . "/config.php";

        $conn = new \mysqli($HOST, $USER, $PASSWORD, $DATABASE);
        $conn->set_charset("utf8mb4");

        // Check connection
        if ($conn->connect_error) {
            throw new \Exception("Could not connect to database.");
        }
        return $conn;
    }
}
