<?php
require __DIR__ . '/../helper/database.php';
require __DIR__ . '/../helper/token.php';

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
  die('Body must include a json object with a token field');
}

$token = $body_json['token'];
$conn = openConnection();

if (verifyToken($token, $conn)) {
  echo '{"valid": true}';
} else {
  // 401 - unauthorized
  http_response_code(401);
  echo '{"valid": false}';
}

exit();
?>
