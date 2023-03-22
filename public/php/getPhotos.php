<?php
// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$folder = '../static/gallery';

$dirs_arr = scandir($folder);
$dirs_arr = array_diff($dirs_arr, ['.', '..']);
$first_dir = true;

echo '{ "folders": [';
foreach ($dirs_arr as $dir) {
  if (is_dir($folder . '/' . $dir)) {
    $files_arr = scandir($folder . '/' . $dir);
    $files_arr = array_diff($files_arr, ['.', '..']);
    $first_file = true;

    if ($first_dir) {
      $first_dir = false;
    } else {
      echo ',';
    }

    echo '{ "name": "' . $dir . '", "photos": [';
    foreach ($files_arr as $file) {
      if ($first_file) {
        $first_file = false;
      } else {
        echo ',';
      }

      echo '"' . $file . '"';
    }
    echo ']}';
  }
}
echo ']}';

exit();
?>
