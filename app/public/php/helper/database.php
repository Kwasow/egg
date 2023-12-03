<?php

function openConnection()
{
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
  } else {
    return $conn;
  }
}

?>
