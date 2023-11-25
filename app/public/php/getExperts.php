<?php
// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$db_address = getenv('DB_ADDRESS');
$db_username = getenv('POSTGRES_USER');
$db_password = getenv('POSTGRES_PASSWORD');
$db_database = getenv('POSTGRES_DB');

$conn = pg_connect(
  'host=' .
    $db_address .
    ' dbname=' .
    $db_database .
    ' user=' .
    $db_username .
    ' password=' .
    $db_password
);

if (!$conn) {
  // 500 - server error
  http_response_code(500);
  die('Could not connect to database: ' . pg_last_error());
}

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

  $description_pl = str_replace('{', '[', $description_pl);
  $description_pl = str_replace('}', ']', $description_pl);
  $description_en = str_replace('{', '[', $description_en);
  $description_en = str_replace('}', ']', $description_en);

  if ($first) {
    $first = false;
  } else {
    echo ',';
  }

  echo '{';
  echo '"position":' . $position . ',';
  echo '"name":"' . $name . '",';
  echo '"description_pl":' . $description_pl . ',';
  echo '"description_en":' . $description_en . ',';
  echo '"picture":"' . $picture . '"';
  echo '}';
}
echo ']}';

exit();
?>
