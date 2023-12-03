<?php

function verifyToken($token, $conn)
{
  // Delete expired tokens
  $query =
    'DELETE FROM Session WHERE last_used < NOW() - INTERVAL \'72 hours\'';
  $result = pg_query_params($conn, $query, []);

  // Check if the session exists in the database
  $query = 'SELECT * FROM Session WHERE session_id = $1';
  $result = pg_query_params($conn, $query, [$token]);

  if (pg_num_rows($result) > 0) {
    // Update last used
    $query = 'UPDATE Session SET last_used = NOW() WHERE session_id = $1';
    $result = pg_query_params($conn, $query, [$token]);

    return true;
  } else {
    // 401 - unauthorized
    http_response_code(401);
    return false;
  }
}

?>
