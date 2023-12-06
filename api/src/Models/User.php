<?php

namespace App\Models;

class User
{
    public static function all(): array
    {
        $db = Database::connect();
        $result = $db->query("CALL read_user_sp()");

        $response = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_object()) {
                $item = [];
                $item['id'] = $row->userId;
                $item['username'] = $row->user_name;
                $item['fullName'] = $row->firstName . " " . $row->lastName;
                $item['status'] = $row->status;
                $item['roleId'] = $row->roleId;
                $item['roleName'] = $row->roleName;
                array_push($response, $item);
            }
        }
        $result->close();
        $db->close();
        return $response;
    }

    public static function create(array $data): int
    {
        [$username, $password, $firstname, $lastname, $status, $username, $role] = $data;
        $db = Database::connect();

        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $db->prepare("CALL create_user_sp(?,?,?,?,?,?,?)");
        $stmt->bind_param("ssssisi", $username, $hashed_password, $firstname, $lastname, $status, $username, $role);
        $stmt->execute();

        $affected = $stmt->affected_rows;
        $stmt->close();

        $db->close();

        return $affected;
    }

    public static function findByUsername(string $username)
    {
        $db = Database::connect();
        $stmt = $db->prepare("CALL find_user_sp(?)");
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $result = $stmt->get_result();
        $stmt->close();

        $row = $result->fetch_object();
        $result->close();

        $db->close();

        return $row;
    }
}
