<?php

function openConnection()
{
  $db_address = getenv('DB_ADDRESS');
  $db_username = getenv('MYSQL_USER');
  $db_password = getenv('MYSQL_PASSWORD');
  $db_database = getenv('MYSQL_DATABASE');

  $conn = mysqli_connect($db_address, $db_username, $db_password, $db_database);

  if (!$conn) {
    // 500 - server error
    http_response_code(500);
    die('Could not connect to database: ' . mysqli_connect_error());
  } else {
    return $conn;
  }
}

?>
