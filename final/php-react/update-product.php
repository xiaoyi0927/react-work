<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->product_id)
    && isset($data->product_name)
    && isset($data->product_price)
    && isset($data->product_cost)
    && is_numeric($data->product_id)
    && !empty(trim($data->product_name))
    && !empty(trim($data->product_price))
    && !empty(trim($data->product_cost))
) {
    $product_name = mysqli_real_escape_string($db_connection, trim($data->product_name));
    $product_price = mysqli_real_escape_string($db_connection, trim($data->product_price));
    $product_cost = mysqli_real_escape_string($db_connection, trim($data->product_cost));
    $updateProduct = mysqli_query($db_connection, "UPDATE `product` SET `ProdName`='$product_name', `UnitPrice`='$product_price', `Cost`='$product_cost' WHERE `ProdId`='$data->product_id'");
    if ($updateUser) {
        echo json_encode(["success" => 1, "msg" => "User Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
?>