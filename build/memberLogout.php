<?php
  session_start();
  if(isset($_COOKIE[session_name()])){
    setcookie(session_name(), '', time() - 36000, '/');
  }
  $_SESSION = [];
  session_destroy();
  $return_array = [true];
  echo json_encode($return_array);
