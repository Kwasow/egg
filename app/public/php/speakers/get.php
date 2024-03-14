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
$stmt = mysqli_prepare($conn, 'SELECT * FROM Speakers ORDER BY position;');
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();
$stmt->close();

$first = true;

echo '{ "list": [';
while ($resource = mysqli_fetch_assoc($result)) {
  $id = $resource['id'];
  $position = $resource['position'];
  $name = $resource['name'];
  $description_pl = $resource['description_pl'];
  $description_en = $resource['description_en'];
  $picture = $resource['picture'];

  if ($first) {
    $first = false;
  } else {
    echo ',';
  }

  echo '{';
  echo '"id": ' . $id . ',';
  echo '"position": ' . $position . ',';
  echo '"name": "' . $name . '",';
  echo '"description_pl": "' . $description_pl . '",';
  echo '"description_en": "' . $description_en . '",';
  echo '"picture": "' . $picture . '"';
  echo '}';
}
echo ']}';

exit();
?>
