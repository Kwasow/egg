<?php
require __DIR__ . '/helper/database.php';

// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$conn = openConnection();

$query = 'SELECT * FROM Experts ORDER BY position';
$result = pg_query_params($conn, $query, []);
$data = pg_fetch_all($result);

$first = true;

echo '{"list":[';
foreach ($data as $speaker) {
  $position = $speaker['position'];
  $name = $speaker['name'];
  $description_pl = $speaker['description_pl'];
  $description_en = $speaker['description_en'];
  $picture = $speaker['picture'];

  if ($first) {
    $first = false;
  } else {
    echo ',';
  }

  echo '{';
  echo '"position":' . $position . ',';
  echo '"name":"' . $name . '",';
  echo '"description_pl": "' . $description_pl . '",';
  echo '"description_en": "' . $description_en . '",';
  echo '"picture":"' . $picture . '"';
  echo '}';
}
echo ']}';

exit();
?>
