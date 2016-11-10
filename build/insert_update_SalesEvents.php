<?php
require_once('formValidateFunctions.php');

function insert_update_SalesEvents(){  
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
    
  $formStatus = $_POST['formStatus'];
  if($formStatus === 'edit'){
      $pre_photo_name = $_POST['previous_picture'];
  }

  $formElementArray = Array();

  $requiredArray = Array();

  $formValid = true;
  $file_included = false;
  $return_valid_array = array();
  $return_array = array(true);
  $member_id = $_SESSION['memberId'];
  $photo_name = '';
  $active = 'N';
  $start_date = '';
  $end_date = '';
  $fileArray = $_FILES;
  $member_id = $_SESSION['memberId'];
  
  $sales_event_end_date = $_POST['end_date'];
  $now = date('Y-m-d',time());
  $max_sale_date = date('Y-m-d',strtotime($now . "+30 days"));
  $datetime1 = date_create($now);
  $datetime2 = date_create($sales_event_end_date);
  $interval = date_diff($datetime1, $datetime2);
  $days = $interval->days;
  $data_array_end = explode('/',$_POST['end_date']);
  $date_str = $data_array_end[2] . '-' . $data_array_end[0] . '-' . $data_array_end[1];
  $data_array_start = explode('/',$_POST['start_date']);
  $start_date = $data_array_start[2] . '-' . $data_array_start[0] . '-' . $data_array_start[1];    
  $end_date = $days <= 30 ? $date_str: $max_sale_date;

  $file_included =  check_file_type_size(150000, $fileArray, $member_id);
  if(strlen($_FILES['salesEventPhoto']['name']) === 0){
      $file_included = false;
  };

  if(isset($_POST['active'])){
      $active = 'Y';
  }

  if($file_included){
      $image_fullsize =  'images/salesevents/img_' . $member_id . '_' . $_FILES['salesEventPhoto']['name'];
      $image_path = '../' . $image_fullsize;
      $file_moved = move_uploaded_file($_FILES['salesEventPhoto']['tmp_name'],$image_path);
      list($width, $height) = getimagesize($image_path);
      $percent = (300/$height);
      $new_width = intval($width * $percent);
      $new_height = intval($height * $percent);
      $image_th =  'images/salesevents/img_thn_' . $member_id . '_' . $_FILES['salesEventPhoto']['name' ];
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
      }
  }

  if($formValid){
      $insert_array = [];
      $insert_array[] = "'" . $active . "'"; //'active'
      $insert_array[] = "'" . $start_date . "'"; //'start_date'
      $insert_array[] = "'" . $end_date . "'"; //'end_date'
      $insert_array[] = "'" . $_POST['list_id'] ."'"; //'list_id'
      $insert_array[] = "'" . $_POST['map'] . "'"; //'map' 
      $insert_array[] = "'" . $_POST['island_id']  . "'"; //'island_id' 
      $insert_array[] = "'" . $image_th . "'"; // image
      $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($_POST['title'])). "'"; //'title' 
      $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($_POST['description'])). "'"; //'description' 
      $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($_POST['search_display'] )). "'"; //'search_display' 
      $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($_POST['full_address'] )). "'"; //'search_display' 
      if($formStatus === 'add'){
          $insert_result = insert_sales_events($insert_array);
          $return_array[0] = $insert_result ;
      }

      if($formStatus === 'edit'){
          $insert_result = update_sales_events($insert_array);
          $return_array[0] = $insert_result ;
      }

  }
  else{
      $return_array[0] = false;
  }
  return json_encode($return_array);
}