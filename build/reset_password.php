<?php
require_once('../../config/dbparams.php');
require_once('mysql_functions.php');

if (isset($_GET['uid']) && !empty($_GET['uid']) && !empty($_GET['puid'])){
  $uid = "'" . $_GET['uid'] . "'";
  $puid = "'" . $_GET['puid'] . "'"; 
  $welcome_password = "'" . sha1('welcome') . "'";
  reset_password($welcome_password, $uid, $puid);
  header('Location: http://www.the242.com/');
}
exit;