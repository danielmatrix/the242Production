<?php
require_once('formValidateFunctions.php');
session_start();


function insert_update_personal_listings($dbc){
  $formStatus = $_POST['formstatus'];
  if($formStatus === 'edit'){
    $listId =  $_POST['listId'];
    $searchName = $_POST['searchName'];
//    $hours = $_POST['hours'];
    $pre_photo_name = $_POST['previous_photo'];
  }

  $formElementArray = Array();

  $requiredArray = Array(
    'freeMemberFirstName' => 'firstname',
    'freeMemberFamilyName' => 'firstname',
    'freeMemberIsland' => 'island',
    'freeMemberPhone' => 'phone'
    );


  array_walk($_POST, function($value, $idx)use (&$formElementArray, $requiredArray){
    $formElementArray[$idx] =  Array($value,$requiredArray[$idx] );
  });

  $formValid = true;
  $file_included = false;
  $return_valid_array = array();
  $return_array = array(true);
  $member_id = $_SESSION['memberId'];
  $photo_name = '';
  $island_id = '';
  $search_display = '';
  $phone_array = Array();


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

  $file_included =  check_file_type_size(100000, $fileArray, $member_id);
  if(strlen($_FILES['freeMemberPhoto']['name']) === 0){
    $file_included = false;
  };

  if($file_included){
    $file_moved = move_uploaded_file($fileArray['freeMemberPhoto']['tmp_name'], '../images/'.$fileArray['freeMemberPhoto']['name']); 
    $photo_name = $file_moved ?  $fileArray['freeMemberPhoto']['name'] : '';
  }
  else{
    $photo_name = (strlen($pre_photo_name) > 0) ? $pre_photo_name : '';
  }      

  $island_id = $formElementArray['freeMemberIsland'][3];
  $page_name = $formElementArray['freeMemberFamilyName'][0] . ' ' . $formElementArray[ 'freeMemberFirstName' ][0] . ' ' . $formElementArray[ 'freeMemberMiddleName' ][0];
  $search_display = preg_replace('/\'|"|\.|:|;|!/','',$page_name);
  $page_name = mysqli_real_escape_string($dbc, $page_name);
  $phone_array = explode('-',$formElementArray['freeMemberPhone'][0]);

  if($formValid){
        $insert_array = [];
        $insert_array[] = "'" . $island_id. "'"; // island_id,
        $insert_array[] = "'" . $page_name . "'"; //page_name, 
        $insert_array[] = "'" . $search_display . "'"; //search_display, 
        $insert_array[] = "'FP'"; //source,
        $insert_array[] = "'" . $phone_array[0] . "'"; //area_code,
        $insert_array[] = "'" . $phone_array[1] . '-' . $phone_array[2]  . "'"; // phone_number,
        $insert_array[] = "'" . date("Y") . "'"; //year,
        $insert_array[] = "'" . $formElementArray['freeMemberIsland'][0] . "'";// island_name, 
        $insert_array[] =  "'" .  $formElementArray['freeMemberEmail'][0]. "'";//email,
        $insert_array[] = "'" . $photo_name . "'";// image_file,
        $insert_array[] = "'" . mysqli_real_escape_string($dbc,$formElementArray['freeMemberInfo'][0]) . "'";// description, 
        $insert_array[] = "'" . mysqli_real_escape_string($dbc,$formElementArray['freeMemberPostal'][0]) . "'";
        $insert_array[] = "'" . mysqli_real_escape_string($dbc,$formElementArray['freeMemberAddress'][0]) . "'";
        $insert_array[] = "'" . $member_id . "'";
        if($formStatus === 'add'){
          $insert_array[] = "'" . $member_id . "'";
          $insert_result = insert_new_personal_listing($dbc,$insert_array,"'" . $search_display . "'");
          $return_array[0] = $insert_result ;
        }
        if($formStatus === 'edit'){
            $insert_array[] = "'" . $listId . "'";
            $insert_result = update_free_personal($dbc,$insert_array, $searchName);
            $return_array[0] = $insert_result ;
        }

      }
      else{
        $return_array[0] = false;
      }
      return json_encode($return_array);
    }