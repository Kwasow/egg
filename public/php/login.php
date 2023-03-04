<?php
  // Set default values
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Cache-control: no-cache, no-store');
  // 200 - ok
  http_response_code(200);

  $username = $_GET['username'];
  $password = $_GET['password'];

  $db_address = file_get_contents('db_details/db_address.txt');
  $db_username = file_get_contents('db_details/db_username.txt');
  $db_password = file_get_contents('db_details/db_password.txt');
  $db_database = file_get_contents('db_details/db_name.txt');

  $conn = mysqli_connect($db_address, $db_username, $db_password, $db_database);

  if (!$conn) {
    die('Connection failed: '.mysqli_connect_error());
  }

  $query = 'SELECT passwd_hash FROM Session WHERE username='.$username;
  $result = mysqli_query($conn, $query);

  if ($mysqli_num_rows($result) != 1) {
    echo '{session_id: ""}';
  } else {
    $row = mysqli_fetch_assoc($result);
    $hash = $row['passwd_hash'];

    if (password_verify($password, $hash)) {
      $date = date('Y-m-d H:i:s');
      $session_id = hash('sha256', $username.$date);

      // Save session id in database
      $query = 'INSERT INTO Session VALUES ('.$session_id.','.$username.',NOW())';

      echo '{session_id: "'.$session_id.'"}';
    } else {
      echo '{session_id: ""}';
    }
  }

  $mysqli_close($conn);
  exit();
?>