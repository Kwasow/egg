<?php
require __DIR__ . '/../helper/database.php';
require __DIR__ . '/../helper/token.php';

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
if (!verifyToken($token, $conn)) {
  // 401 - unauthorized
  http_response_code(401);

  die('Unauthorized token');
}

// Delete resource
$stmt = mysqli_prepare($conn, 'DELETE FROM Speakers WHERE id = ?;');
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();

if (mysqli_stmt_affected_rows($stmt) != 1) {
  // 500 - server error
  http_response_code(500);

  $stmt->close();
  die('Failed to delete resource from database: ' . mysqli_error($conn));
}

$stmt->close();

exit();
?>
