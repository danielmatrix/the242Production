<?php
require_once('../../config/dbparams.php');
require_once('mysql_functions.php');

if (isset($_GET['uid']) && !empty($_GET['uid']) && !empty($_GET['email'])){
  $uid = "'" . $_GET['uid'] . "'";
  $result = update_confirm_email($uid);

  if($result){
    $to      = $_GET['email'];
    $subject = 'the242.com Thanks you for confirming your email address';
    $message =  "We can now email you important updates and events.\r\n";
    $headers = 'From:the242Support' . "\r\n" .
    'Reply-To: the242Support@gamil.com' . "\r\n"; 

    mail($to, $subject, $message, $headers);
  }

  header('Location: http://www.the242.com/');
}
exit;


