<?php
require __DIR__ . '/helper/database.php';
require __DIR__ . '/helper/token.php';

// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$token = $_POST['token'];
$conn = openConnection();

// Validate token
if (verifyToken($token, $conn)) {
  // Update last used
  $query = 'UPDATE Session SET last_used = NOW() WHERE session_id = $1';
  $result = pg_query_params($conn, $query, [$token]);
} else {
  // 401 - unauthorized
  http_response_code(401);
  die('Unauthorized token');
}

// Validate form details
if (!isset($_POST['name']) or !isset($_FILES['file'])) {
  // 400 - bad request
  http_response_code(400);
  die('Request required "name" and "file" arguments');
}

// Save resource
$name = $_POST['name'];
$path = '/resources/';
$original_file_name = $_FILES['file']['name'];

$query =
  'INSERT INTO Resources(name, original_file_name, file_path) VALUES ($1, $2, $3) RETURNING ID';
$result = pg_query_params($conn, $query, [$name, $original_file_name, $path]);

if (!$result) {
  // 500 - server error
  http_response_code(500);
  die('Failed to save resource to database: ' . pg_last_error());
}

$id = pg_fetch_assoc($result)['id'];
$full_path = __DIR__ . '/..' . $path . $id;

if (move_uploaded_file($_FILES['file']['tmp_name'], $full_path)) {
  echo '{"success": true}';
} else {
  $query = 'DELETE FROM Resources WHERE id = $1';
  $result = pg_query_params($conn, $query, [$id]);

  // 500 - server error
  http_response_code(500);
  die('{"success": false}');
}

exit();
?>
