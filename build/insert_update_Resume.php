<?php
require_once('formValidateFunctions.php');
session_start();

function insert_update_resume(){

  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");    
        
  $formStatus = $_POST['formStatus'];
  if($formStatus === 'edit'){
    $resume = $_POST['resume'];
    $pre_photo_name = $_POST['previous_Picture'];
  }

  $formElementArray = Array();

  $requiredArray = Array();

  $formValid = true;
  $file_included = false;
  $return_valid_array = array();
  $return_array = array(true);
  $member_id = $_SESSION['memberId'];
  $photo_name = '';
  $resume_active = 'N';

  $file_included =  check_file_type_size(50000, $fileArray, $member_id);
  if(strlen($_FILES['freeResumePhoto']['name']) === 0){
      $file_included = false;
  };
  
  if(isset($_POST[resumeActive])){
      $resume_active = 'Y';
  }
  
  if($file_included){
      $image_fullsize =  'images/resume/img_' . $member_id . '_' . $_FILES['freeResumePhoto']['name'];
      $image_path = '../' . $image_fullsize;
      $file_moved = move_uploaded_file($_FILES['freeResumePhoto']['tmp_name'],$image_path);
      list($width, $height) = getimagesize($image_path);
      $percent = (75/$height);
      $new_width = intval($width * $percent);
      $new_height = intval($height * $percent);
      $image_th =  'images/resume/img_thn_' . $member_id . '_' . $_FILES['freeResumePhoto']['name' ];
      $image_th_path = '../' . $image_th;
      // Resample
      $image_p = imagecreatetruecolor($new_width, $new_height);
      $image = imagecreatefromjpeg($image_path);
      imagecopyresampled($image_p, $image, 0, 0, 0, 0,$new_width, $new_height, $width, $height);
      imagejpeg ($image_p,$image_th_path);
      if(strlen($_POST['removePhoto']) > 0){
        $_POST['resume'] = str_replace($_POST['removePhoto'], $image_th, $_POST['resume']); 
      }
      else{
        $_POST['resume'] = str_replace('images/resume/img_thn_default.png', $image_th, $_POST['resume']);  
      }
       
  }
  else{
      if(strlen($pre_photo_name) > 0){
          $image_th = $pre_photo_name;
      }
      else{
          $image_th = '';
          $_POST['resume'] = str_replace($_POST['removePhoto'], 'images/resume/img_thn_default.png', $_POST['resume']); 
      }
  }  

  if($formValid){
        $insert_array = [];
        $insert_array[] = "'" . $member_id . "'"; //member_id 
        $insert_array[] = "'" . $resume_active . "'"; //active
        $insert_array[] = "'" . $_POST['resumeName'] . "'"; //resume_name 
        $insert_array[] = "'" . $_POST['resumeEmail'] ."'"; //email
        $insert_array[] = "'" . $_POST['resumePhone'] . "'"; //phone
        $insert_array[] = "'" . $image_th . "'"; // image
        $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($_POST['resume'])). "'"; //resume

        if($formStatus === 'add'){
          $insert_result = insert_resume($insert_array);
          $return_array[0] = $insert_result ;
        }

        if($formStatus === 'edit'){
            $insert_result = update_resume($insert_array);
            $return_array[0] = $insert_result ;
            if($resume_active === 'N'){
              $return_array[0] = delete_help_wanted_member($member_id); 
            }
        }

      }
      else{
        $return_array[0] = false;
      }
      return json_encode($return_array);
}
    
   