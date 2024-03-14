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
$conn = openConnection();

// Validate token
if (!verifyToken($token, $conn)) {
  http_response_code(401);
  die('Unauthorized token: ' . $token);
}

// Return resources
$stmt = mysqli_prepare($conn, 'SELECT * FROM Resources');
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();
$stmt->close();

$first = true;

echo '[';
while ($resource = mysqli_fetch_assoc($result)) {
  $id = $resource['id'];
  $name = $resource['name'];
  $original_file_name = $resource['original_file_name'];
  $file_path = $resource['file_path'] . $id;

  if ($first) {
    $first = false;
  } else {
    echo ',';
  }

  echo '{';
  echo '"id":' . $id . ',';
  echo '"name":"' . $name . '",';
  echo '"originalFileName":"' . $original_file_name . '",';
  echo '"path": "' . $file_path . '"';
  echo '}';
}
echo ']';

exit();
?>
