<?php
  // Set default values
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');
  header('Cache-control: no-cache, no-store');
  // 200 - ok
  http_response_code(200);

  if($argc > 1) {
    parse_str(implode('&', array_slice($argv, 1)), $_GET);
  }

  $username = base64_decode($_GET['username']);
  $password = base64_decode($_GET['password']);

  $db_address = file_get_contents(__DIR__.'/db_details/db_address.txt');
  $db_username = file_get_contents(__DIR__.'/db_details/db_username.txt');
  $db_password = file_get_contents(__DIR__.'/db_details/db_password.txt');
  $db_database = file_get_contents(__DIR__.'/db_details/db_database.txt');

  $conn = mysqli_connect($db_address, $db_username, $db_password, $db_database);

  if (!$conn) {
    die('Connection failed: '.mysqli_connect_error());
  }

  $stmt = mysqli_prepare(
    $conn,
    'SELECT passwd_hash FROM User WHERE username = ?'
  );
  mysqli_stmt_bind_param($stmt, 's', $username);
  mysqli_stmt_execute($stmt);

  $result = $stmt->get_result();
  $stmt->close();

  if (mysqli_num_rows($result) != 1) {
    echo '{"session_id": ""}';
  } else {
    $row = mysqli_fetch_assoc($result);
    $hash = $row['passwd_hash'];

    if (password_verify($password, $hash)) {
      $date = date('Y-m-d H:i:s');
      $session_id = hash('sha256', $username.$date.$password);

      // Save session id in database
      $stmt = mysqli_prepare(
        $conn,
        'INSERT INTO Session VALUES (?, ?, NOW())'
      );
      mysqli_stmt_bind_param($stmt, 'ss', $session_id, $username);
      mysqli_stmt_execute($stmt);
      $stmt->close();

      echo '{"session_id": "'.$session_id.'"}';
    } else {
      echo '{"session_id": ""}';
    }
  }

  mysqli_close($conn);
  exit();
?>