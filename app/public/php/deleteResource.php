<?php
require __DIR__ . '/helper/database.php';
require __DIR__ . '/helper/token.php';

// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$token = $_SERVER['HTTP_EGGAUTH'];
$id = $_GET['id'];
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

// Delete resource
$name = $_POST['name'];
$path = '/resources/';
$original_file_name = $_FILES['file']['name'];

$query = 'DELETE FROM Resources WHERE id = $1 RETURNING file_path';
$result = pg_query_params($conn, $query, [$id]);

if (!$result) {
  // 500 - server error
  http_response_code(500);
  die('Failed to delete resource from database: ' . pg_last_error());
}

$file_path = pg_fetch_assoc($result)['file_path'];
$full_path = __DIR__ . '/..' . $path . $id;

unlink($full_path);

exit();
?>
