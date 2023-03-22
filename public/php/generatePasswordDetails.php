<?php
// Set default values
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

if ($argc > 1) {
  parse_str(implode('&', array_slice($argv, 1)), $_GET);
}

$password = $_GET['password'];

echo password_hash($password, PASSWORD_BCRYPT);
exit();
?>
