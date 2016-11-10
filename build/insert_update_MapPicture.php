<?php
require_once('formValidateFunctions.php');
session_start();

function insert_update_MapPicture(){
  
  $member_id = $_SESSION['memberId'];
  
  $list_id = $_POST['list_id'];
  $previous_MapPicture = $_POST['previous_MapPicture'];

  $requiredArray = Array();

  $formElementArray = Array();


  array_walk($_POST, function($value, $idx)use (&$formElementArray, $requiredArray){
    $formElementArray[$idx] =  Array($value,$requiredArray[$idx] );
  });

  $formValid = true;
  $file_included = false;
  $return_valid_array = array();
  $return_array = array(true);

  $fileArray = $_FILES;

  array_walk($formElementArray, function($value, $idx) use (&$formElementArray, &$return_valid_array){
    $formElementArray[$idx][0] = trim(urldecode($formElementArray[$idx][0]));
    if($formElementArray[$idx][1]){
      $return_valid_array[$idx] = $value[1]($idx,$formElementArray);
    }
    else{
      $formElementArray[$idx][] = true;
    }
  });

  foreach($requiredArray as $key => $value){
    $formValid = $formValid  && $return_valid_array[$key];
  }

  $file_included =  check_file_type_size(50000, $fileArray, $member_id);
  if(strlen($_FILES['mapPicture']['name']) === 0){
    $file_included = false;
  };

  if($file_included){
    $file_moved = move_uploaded_file($fileArray['mapPicture']['tmp_name'], '../images/'.$fileArray['mapPicture']['name']);
    $photo_name = $file_moved ?  $fileArray['mapPicture']['name'] : '';
  }
  else{
    $photo_name = (strlen($previous_MapPicture) > 0) ? $previous_MapPicture : '';
  }



  $insert_banner_array = [];
            $insert_banner_array['list_id'] = "'" . $list_id . "'"; // island_id,
            $insert_banner_array['photo_name'] = "'" . $photo_name . "'"; //photo_name,


            if($formValid){
              $results = update_MapPicture(array_values($insert_banner_array));
              $return_array[0] =  $results;
            }
            else{
              $return_array[0] = false;
            } //if $formValid

return json_encode($return_array);
}