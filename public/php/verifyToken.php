<?php
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Cache-control: no-cache, no-store');
  // 200 - ok
  http_response_code(200);

  $username = $_GET['username'];
  $token = $_GET['token'];

  $db_address = file_get_contents('db_details/db_address.txt');
  $db_username = file_get_contents('db_details/db_username.txt');
  $db_password = file_get_contents('db_details/db_password.txt');
  $db_database = file_get_contents('db_details/db_name.txt');

  $conn = mysqli_connect($db_address, $db_username, $db_password, $db_database);

  if (!$conn) {
    die('Connection failed: '.mysqli_connect_error());
  }

  // Check if the session exists in the database
  $query = 'SELECT * FROM Session WHERE session_id='.$token;
  $result = mysqli_query($conn, $query);

  if ($mysqli_num_rows($result) > 0) {
    // Update last used
    $query = 'UPDATE Session SET last_used=NOW() WHERE session_id='.$token;
    $result = mysqli_query($conn, $query);

    echo '{valid: true}';
  } else {
    echo '{valid: false}';
  }

  $mysqli_close($conn);
  exit();
?>