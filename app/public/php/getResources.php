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
$conn = openConnection();

// Validate token
if (!verifyToken($token, $conn)) {
  http_response_code(401);
  die('Unauthorized token: ' . $token);
}

// Return resources
$query = 'SELECT * FROM Resources';
$result = pg_query_params($conn, $query, []);
$data = pg_fetch_all($result);

$first = true;

echo '[';
foreach ($data as $resource) {
  $id = $resource['id'];
  $name = $resource['name'];
  $original_file_name = $resource['original_file_name'];
  $file_path = $resource['file_path'];

  if ($first) {
    $first = false;
  } else {
    echo ',';
  }

  echo '{';
  echo '"id":' . $id . ',';
  echo '"name":"' . $name . '",';
  echo '"originalFileName":"' . $original_file_name . '",';
  echo '"file_path": "' . $file_path . '"';
  echo '}';
}
echo ']';

exit();
?>
