<?php

function verifyToken($token, $conn)
{
  // Delete expired tokens
  $stmt = mysqli_prepare(
    $conn,
    'DELETE FROM Session WHERE HOUR(TIMEDIFF(NOW(), last_used)) > 72'
  );
  mysqli_stmt_execute($stmt);
  $stmt->close();

  // Check if the session exists in the database
  $stmt = mysqli_prepare($conn, 'SELECT * FROM Session WHERE session_id = ?');
  mysqli_stmt_bind_param($stmt, 's', $token);
  mysqli_stmt_execute($stmt);

  $result = $stmt->get_result();
  $stmt->close();

  if (mysqli_num_rows($result) > 0) {
    // Update last used
    $stmt = mysqli_prepare(
      $conn,
      'UPDATE Session SET last_used = NOW() WHERE session_id = ?'
    );
    mysqli_stmt_bind_param($stmt, 's', $token);
    mysqli_stmt_execute($stmt);
    $stmt->close();

    return true;
  } else {
    return false;
  }
}

?>
