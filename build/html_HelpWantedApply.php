<?php

$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
mysqli_select_db ($dbc, "the242");

$list_id = $_POST['list_id'];
$html_out = '';
$html_out  .= '<div class="panel-group" id="accordion_hwa" role="tablist" aria-multiselectable="true">';

$sql_result = @mysqli_query($dbc,"CALL get_help_wanted_apply($list_id)");
$loop_cnt = 0;
 while($row_wl = mysqli_fetch_assoc($sql_result)){
     extract($row_wl); //resume_id,resume_name,job_title
     if(strlen($email) > 0){
      $email_status = '';
     }
     else{
      $email_status = 'disabled'; 
     } 
     $html_out  .= '<div class="panel panel-default">';
     $html_out  .= " <div class='panel-heading' role='tab'' id='headingOneHWA$loop_cnt'>";
     $html_out  .= ' <h4 class="panel-title">';
     $html_out  .= "<a href='#' class='btn btn-default btn-xs email-resume' data-email='$email' data-element='resumeNotify' data-job_id='$job_id' $email_status><span class='glyphicon glyphicon-envelope'></span></a>";
     $html_out  .= " <a role='button' data-toggle='collapse'' data-parent='#accordion_hwa'' href='#collapseHWA$loop_cnt' aria-expanded='true' aria-controls='collapse$loop_cnt'>";
     $html_out  .= "$job_title - $resume_name &nbsp;&nbsp;&nbsp;<span><small>$date_applied</small></span>";
     $html_out  .= '</a>';
     $html_out  .= '</h4>';
     $html_out  .= '</div>';
     $html_out  .= "<div id='collapseHWA$loop_cnt'  data-display-div='resume$resume_id' data-resume_id='$resume_id' class='panel-collapse collapse apply' role='tabpanel' aria-labelledby='headingOneHWA'>";
     $html_out  .= "<div id='resume$resume_id' class='panel-body'>Loading Resume...</div>";
     $html_out  .= '</div></div>';    
 $loop_cnt = $loop_cnt + 1;
 }
 
 echo $html_out;

                
                
                 