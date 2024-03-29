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
if (
  !isset($_POST['name']) or
  !isset($_POST['description']) or
  !isset($_POST['picture']) or
  !isset($_POST['position'])
) {
  // 400 - bad request
  http_response_code(400);
  die(
    'Request required "name", "description", "picture" and "position" arguments'
  );
}

// Save resource
$position = $_POST['position'];
$name = $_POST['name'];
$description = $_POST['description'];
$picture = $_POST['picture'];

$stmt = mysqli_prepare(
  $conn,
  'INSERT INTO Experts(position, name, description, picture) VALUES (?, ?, ?, ?);'
);
mysqli_stmt_bind_param($stmt, 'issi', $position, $name, $description, $picture);
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();
$stmt->close();

if (!$result) {
  // 500 - server error
  http_response_code(500);
  header(
    'Location: ' . $_SERVER['HTTP_REFERER'] . 'admin/experts?add_success=false'
  );
} else {
  header(
    'Location: ' . $_SERVER['HTTP_REFERER'] . 'admin/experts?add_success=true'
  );
}

exit();
?>
