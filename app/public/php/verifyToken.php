<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-control: no-cache, no-store');
// 200 - ok
http_response_code(200);

$body = file_get_contents('php://input');
$body_json = json_decode($body, true);

if ($body_json == null || !array_key_exists('token', $body_json)) {
  // Bad requests
  http_response_code(400);
  echo 'Body must include a json object with a token field';
  die('Bad request');
}

$token = $body_json['token'];

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

// Delete expired tokens
$query = 'DELETE FROM Session WHERE HOUR(TIMEDIFF(NOW(), last_used)) > 72';
$result = pg_query_params($conn, $query, []);

// Check if the session exists in the database
$query = 'SELECT * FROM Session WHERE session_id = $1';
$result = pg_query_params($conn, $query, [$token]);

if (pg_num_rows($result) > 0) {
  // Update last used
  $query = 'UPDATE Session SET last_used = NOW() WHERE session_id = $1';
  $result = pg_query_params($conn, $query, [$token]);

  echo '{"valid": true}';
} else {
  // 401 - unauthorized
  http_response_code(401);
  echo '{"valid": false}';
}

exit();
?>
