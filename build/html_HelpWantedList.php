<?php
require_once('../../config/dbparams.php');

$list_id = $_POST['list_id'];
$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");

$html_out =  '';
$id_cnt = 0;

$sql_select_d = @mysqli_query($dbc,"CALL get_help_wanted_list($list_id)");
while($row_listings = mysqli_fetch_array($sql_select_d)){
  extract($row_listings);
  $id_cnt = $id_cnt + 1;
  
  $html_out .= "<li class='list-group-item ps_list' id='li$id_cnt'>";
  $html_out .= "<div class='dropdown'>";
  $html_out .= "<button class='btn btn-default dropdown-toggle btn-xs hw_list_dropdown' type='button' id='dropdownMenu$id_cnt' data-toggle='dropdown' aria-expanded='true'>";
  $html_out .= "<span class='caret'></span></button>";
  $html_out .= "<ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu$id_cnt'>";
  $html_out .= "<li role='presentation'><a class='editHelpWanted' role='menuitem' tabindex='-1' href='$id' data-element='aEditHelpWanted'>Edit</a></li>";
  $html_out .= "<li role='presentation'><a class='editHelpWanted' data_list_id='$list_id' role='menuitem' tabindex='-1' href='$id'  data-element='aDeleteHelpWanted'><span class='text-danger'>Delete</span></a></li>"; 
  $html_out .= "</ul>";
  $html_out .= "</div>";
  $html_out .= "<div class='hw_name'>";
  $html_out .= "<p id='p$id_cnt'>$job_title - $DatePosted<p>";
  $html_out .= "</div>";
  $html_out .= "</li>";
}    
    
echo $html_out;  