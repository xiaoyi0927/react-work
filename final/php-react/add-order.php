<?php
// update-user.php is for updating an existing user.
// Method: POST - http://localhost/php-react/update-user.php
// Required Fields: id --> EmpId, user_name --> EmpName, user_email --> JobTitle

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// DB connection: $db_connection from db_connection.php
require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
if (
    isset($data->seq) &&
    isset($data->OrderId) &&
    isset($data->EmpId) &&
    isset($data->CustId) &&
    isset($data->OrderDate) &&
    isset($data->Descript) 
) {
    $seq = $data->seq;
    $OrderId =  $data->OrderId;
    $EmpId =  $data->EmpId;
    $CustId = $data->CustId;
    $OrderDate = $data->OrderDate;
    $Descript = $data->Descript;

    $sql = "INSERT INTO `salesorder`(`seq`, `OrderId`, `EmpId`, `CustId`, `OrderDate`, `Descript`) VALUES ('$seq','$OrderId',$EmpId,$CustId,$OrderDate,$Descript)";
    $query = mysqli_query($db_connection, $sql);
    if ($query) {
        $last_id = mysqli_insert_id($db_connection);
        echo json_encode(["success" => 1, "msg" => "Product added", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 1, "msg" => "Add failed"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Add failed"]);
}
