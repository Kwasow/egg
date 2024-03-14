<?php
require __DIR__ . '/../helper/database.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$body = file_get_contents('php://input');
$body_json = json_decode($body, true);

if ($body_json == null || !array_key_exists('token', $body_json)) {
  // Bad requests
  http_response_code(400);
  echo 'Body must include a json object with a token field';
  die('Bad request');
}

$token = $body_json['token'];

$conn = openConnection();

// Delete the given token
$stmt = mysqli_prepare($conn, 'DELETE FROM Session WHERE session_id = ?');
mysqli_stmt_bind_param($stmt, 's', $token);
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();
$stmt->close();

exit();
?>
