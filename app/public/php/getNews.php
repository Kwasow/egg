<?php
require __DIR__ . '/helper/database.php';

// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$conn = openConnection();

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
