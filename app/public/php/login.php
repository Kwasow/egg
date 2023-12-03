<?php
require __DIR__ . '/helper/database.php';

// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$body = file_get_contents('php://input');
$body_json = json_decode($body, true);

if (
  $body_json == null ||
  !array_key_exists('username', $body_json) ||
  !array_key_exists('password', $body_json)
) {
  // Bad requests
  http_response_code(400);
  echo 'Body must include a json object with a username and password field';
  die('Bad request');
}

$username = $body_json['username'];
$password = $body_json['password'];

$conn = openConnection();

$query = 'SELECT passwd_hash FROM EggUser WHERE username = $1';
$result = pg_query_params($conn, $query, [$username]);

if (pg_num_rows($result) != 1) {
  // 401 - unauthorized
  http_response_code(401);
  echo '{"session_id": ""}';
} else {
  $row = pg_fetch_assoc($result);
  $hash = $row['passwd_hash'];

  if (password_verify($password, $hash)) {
    $date = date('Y-m-d H:i:s');
    $session_id = hash('sha256', random_bytes(128));

    // Save session id in database
    $query = 'INSERT INTO Session VALUES ($1, $2, NOW())';
    $result = pg_query_params($conn, $query, [$session_id, $username]);

    echo '{"session_id": "' . $session_id . '"}';
  } else {
    // 401 - unauthorized
    http_response_code(401);
    echo '{"session_id": ""}';
  }
}

exit();
?>
