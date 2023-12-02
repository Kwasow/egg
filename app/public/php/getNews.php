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

$query = 'SELECT * FROM News';
$result = pg_query_params($conn, $query, []);
$data = pg_fetch_all($result);

$first = true;

echo '{"news":[';
foreach ($data as $news) {
  $title_pl = $news['title_pl'];
  $title_en = $news['title_en'];
  $text_pl = $news['text_pl'];
  $text_en = $news['text_en'];
  $image = $news['image'];
  $date = $news['published_date'];

  if ($first) {
    $first = false;
  } else {
    echo ',';
  }

  echo '{';
  echo '"title_pl":"' . $title_pl . '",';
  echo '"title_en":"' . $title_en . '",';
  echo '"text_pl": "' . $text_pl . '",';
  echo '"text_en": "' . $text_en . '",';
  echo '"image":"' . $image . '",';
  echo '"date":"' . $date . '"';
  echo '}';
}
echo ']}';

exit();
?>
