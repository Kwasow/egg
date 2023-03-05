<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Cache-control: no-cache, no-store');
  // 200 - ok
  http_response_code(200);

  if($argc > 1) {
    parse_str(implode('&', array_slice($argv, 1)), $_GET);
  }

  $token = $_GET['token'];

  $db_address = file_get_contents(__DIR__.'/db_details/db_address.txt');
  $db_username = file_get_contents(__DIR__.'/db_details/db_username.txt');
  $db_password = file_get_contents(__DIR__.'/db_details/db_password.txt');
  $db_database = file_get_contents(__DIR__.'/db_details/db_database.txt');

  $conn = mysqli_connect($db_address, $db_username, $db_password, $db_database);

  if (!$conn) {
    // 500 - server error
    http_response_code(500);
    die('Connection failed: '.mysqli_connect_error());
  }

  // Delete the given token
  $stmt = mysqli_prepare(
    $conn,
    'DELETE FROM Session WHERE session_id = ?'
  );
  mysqli_stmt_bind_param($stmt, 's', $token);
  mysqli_stmt_execute($stmt);

  $result = $stmt->get_result();
  $stmt->close();

  exit();
?>