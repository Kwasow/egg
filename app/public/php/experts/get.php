<?php
require __DIR__ . '/../helper/database.php';
require __DIR__ . '/../helper/token.php';

// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$conn = openConnection();

// Return resources
$stmt = mysqli_prepare($conn, 'SELECT * FROM Experts ORDER BY position;');
mysqli_stmt_execute($stmt);

$result = $stmt->get_result();
$stmt->close();

$first = true;
echo '{ "list": [';
while ($resource = mysqli_fetch_assoc($result)) {
  $id = $resource['id'];
  $position = $resource['position'];
  $name = $resource['name'];
  $description = $resource['description'];
  $picture = '/resources/' . $resource['picture'];

  if ($first) {
    $first = false;
  } else {
    echo ',';
  }

  echo '{';
  echo '"id": ' . $id . ',';
  echo '"position": ' . $position . ',';
  echo '"name": "' . $name . '",';
  echo '"description": "' . $description . '",';
  echo '"picture": "' . $picture . '"';
  echo '}';
}
echo ']}';

exit();
?>
