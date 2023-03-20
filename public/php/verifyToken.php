<?php
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

$db_address = file_get_contents(__DIR__ . '/db_details/db_address.txt');
$db_username = file_get_contents(__DIR__ . '/db_details/db_username.txt');
$db_password = file_get_contents(__DIR__ . '/db_details/db_password.txt');
$db_database = file_get_contents(__DIR__ . '/db_details/db_database.txt');

$conn = mysqli_connect($db_address, $db_username, $db_password, $db_database);

if (!$conn) {
  // 500 - server error
  http_response_code(500);
  die('Connection failed: ' . mysqli_connect_error());
}

// Delete expired tokens
$stmt = mysqli_prepare(
  $conn,
  'DELETE FROM Session WHERE HOUR(TIMEDIFF(NOW(), last_used)) > 72'
);
mysqli_stmt_execute($stmt);
$stmt->close();

// Check if the session exists in the database
$stmt = mysqli_prepare($conn, 'SELECT * FROM Session WHERE session_id = ?');
mysqli_stmt_bind_param($stmt, 's', $token);
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();
$stmt->close();

if (mysqli_num_rows($result) > 0) {
  // Update last used
  $stmt = mysqli_prepare(
    $conn,
    'UPDATE Session SET last_used = NOW() WHERE session_id = ?'
  );
  mysqli_stmt_bind_param($stmt, 's', $token);
  mysqli_stmt_execute($stmt);
  $stmt->close();

  echo '{"valid": true}';
} else {
  echo '{"valid": false}';
}

mysqli_close($conn);
exit();
?>
