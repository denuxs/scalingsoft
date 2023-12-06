<?php

namespace App\Models;

class Role
{
    public static function all(): array
    {
        $db = Database::connect();
        $result = $db->query("CALL read_role_sp()");

        $response = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_object()) {
                $item = [];
                $item['id'] = $row->roleId;
                $item['name'] = $row->roleName;
                $item['status'] = $row->status;
                array_push($response, $item);
            }
        }
        $result->close();
        $db->close();
        return $response;
    }
}
