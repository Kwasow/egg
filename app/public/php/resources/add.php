<?php
require __DIR__ . '/../helper/database.php';
require __DIR__ . '/../helper/token.php';

// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$token = $_POST['token'];
$conn = openConnection();

// Validate token
if (!verifyToken($token, $conn)) {
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

$stmt = mysqli_prepare(
  $conn,
  'INSERT INTO Resources(name, original_file_name, file_path) VALUES (?, ?, ?);'
);
mysqli_stmt_bind_param($stmt, 'sss', $name, $original_file_name, $path);
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();
$stmt->close();

if (!$result) {
  // 500 - server error
  http_response_code(500);
  header(
    'Location: ' .
      $_SERVER['HTTP_REFERER'] .
      'admin/resources?add_success=false'
  );
}

$id = mysqli_insert_id($conn);
$full_path = __DIR__ . '/../..' . $path . $id;

if (move_uploaded_file($_FILES['file']['tmp_name'], $full_path)) {
  header(
    'Location: ' . $_SERVER['HTTP_REFERER'] . 'admin/resources?add_success=true'
  );
} else {
  $stmt = mysqli_prepare($conn, 'DELETE FROM Resources WHERE id = ?');
  mysqli_stmt_bind_param($stmt, 'i', $id);
  mysqli_stmt_execute($stmt);
  
  $result = $stmt->get_result();
  $stmt->close();

  // 500 - server error
  http_response_code(500);
  header(
    'Location: ' .
      $_SERVER['HTTP_REFERER'] .
      'admin/resources?add_success=false'
  );

  die('Failed to save resource');
}

exit();
?>
