<?php
require_once('formValidateFunctions.php');
session_start();

function insert_update_for_rent($control){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  
  $member_id = $_SESSION['memberId'];
  
  $four_files = Array();
  $four_files[] = Array(false,$_POST[photo_1],'','','');
  $four_files[] = Array(false,$_POST[photo_2],'','','');
  $four_files[] = Array(false,$_POST[photo_3],'','','');
  $four_files[] = Array(false,$_POST[photo_4],'','','');
  
  $file_array_idx = 0;
  array_walk($_FILES, function($value, $idx) use($member_id, &$file_array_idx, &$four_files) {
   $four_files[$file_array_idx][0] = check_single_file_type_size(50000, $value, $member_id);
   $four_files[$file_array_idx][2] =  '../images/for_rent/img_' . $member_id . '_' . $value['name'];
   $four_files[$file_array_idx][3] =  'images/for_rent/img_thn_' . $member_id . '_'. $value['name'];
   $four_files[$file_array_idx][4] =  $value['tmp_name'];
    if(strlen($_FILES[$idx]['name']) === 0){
        $file_included = false;
    };
    $file_array_idx = $file_array_idx + 1;
  }); 

  for($var=0,$len=4;$var < $len; ++$var){
    if($four_files[$var][0]){
      $file_moved = move_uploaded_file($four_files[$var][4],$four_files[$var][2]);
      list($width, $height) = getimagesize($four_files[$var][2]);
      $percent = (300/$height);
      $new_width = intval($width * $percent);
      $new_height = intval($height * $percent);            
      $image_th_path = '../' . $four_files[$var][3];
      // Resample
      $image_p = imagecreatetruecolor($new_width, $new_height);
      $image = imagecreatefromjpeg($four_files[$var][2]);
      imagecopyresampled($image_p, $image, 0, 0, 0, 0,$new_width, $new_height, $width, $height);
      imagejpeg ($image_p,$image_th_path);
    }
    else{
      if(strlen($four_files[$var][1]) > 0){
          $four_files[$var][3] = $four_files[$var][1];
      }
      else{
          $four_files[$var][3]  = '';
      }   
    }
  }
  
  $adLine = $_POST['adLine' . $control];
  $description = $_POST['description' . $control];
  $address = $_POST['address' . $control];
  $map = $_POST['map' . $control];
  $email = $_POST['email' . $control];
  $phone = $_POST['phone' . $control];
  $classifiedIsland = $_POST['classifiedIsland' . $control];
  $island_id = get_island_id("'" . $classifiedIsland . "'");
  $pricing = $_POST['pricing' . $control];
  $active = $_POST['active' . $control];

  $formStatus = $_POST['formStatus'];

  $formElementArray = Array();

  $requiredArray = Array();

  $formValid = true;
  $return_valid_array = array();
  $return_array = array(true);
  $active = 'N';

  if(isset($_POST['active' . $control])){
      $active = 'Y';
  }
  
  if($formValid){
    //member_id, control_number, adline, description, address, map, phone, email, island_id, pricing, image_1, image_2, image_3, image_4, active
    $insert_array = [];
    $insert_array[] = "'" . $member_id . "'"; //member_id
    $insert_array[] = "'" . $_POST[ 'control'] . "'"; //control_number
    $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($adLine)) . "'"; //adline
    $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($description)) . "'"; //description
    $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($address)) . "'"; //address
    $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($map)) . "'"; //map
    $insert_array[] = "'" . $phone ."'"; //phone
    $insert_array[] = "'" . $email . "'"; //email
    $insert_array[] = "'" . $island_id  . "'";//island_id
    $insert_array[] = "'" . $pricing . "'"; //pricing
    $insert_array[] = "'" . $four_files[0][3]  . "'"; // image1
    $insert_array[] = "'" . $four_files[1][3] . "'"; // image2
    $insert_array[] = "'" . $four_files[2][3] . "'"; // image3
    $insert_array[] = "'" . $four_files[3][3] . "'"; // image4
    $insert_array[] = "'" . $active . "'"; // active


    if($formStatus === 'add'){
        $insert_result = insert_for_rent($insert_array);
        $return_array[0] = $insert_result;
    }

    if($formStatus === 'edit'){
        $insert_result = update_for_rent($insert_array);
        $return_array[0] = $insert_result;
    }

  }
  else{
    $return_array[0] = false;
  }
  return json_encode($return_array[0]);
}