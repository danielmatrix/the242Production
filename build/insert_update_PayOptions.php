<?php
require_once('formValidateFunctions.php');
session_start();

function insert_update_PayOptions($dbc){
  $formStatus = $_POST['formstatus'];
  $card_type = $_POST['cardtype'];
  if($formStatus === 'edit'){
    $payOptopnId = $_POST['payOptopnId'];
    $item_cnt = $_POST['item_cnt'];
  }
  
  $card_icon_array = Array
  ( '1' => 'visa_icon.png',
    '2' => 'mastercard_icon.png',
    '3' => 'americanexpress_icon.png',
    '4' => 'cheque_icon.jpeg'    
  );

  $member_id = $_SESSION['memberId'];
  
  $formElementArray = Array();

  $requiredArray = Array(
    );


  array_walk($_POST, function($value, $idx)use (&$formElementArray, $requiredArray){
    $formElementArray[$idx] =  Array($value,$requiredArray[$idx] );
  });

  $formValid = true;
  $return_valid_array = array();
  $return_array = array(true);

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

    $member_id = $member_id;
    $card_type = $_POST['cardtype'];  
    $card_icon =  $card_icon_array[$card_type];  

    if($formStatus === 'add'){
      $card_number = mysqli_real_escape_string($dbc,$formElementArray['card_number'][0]);
      $security_code = mysqli_real_escape_string($dbc,$formElementArray['security_code'][0]);
      $expiration = mysqli_real_escape_string($dbc,$formElementArray['expiration_date'][0]);
      $name_on_card = mysqli_real_escape_string($dbc,$formElementArray['name_on_card'][0]);
      $billing_address = mysqli_real_escape_string($dbc,$formElementArray['billing_address'][0]);
    }
    
    if($formStatus === 'edit'){
        $card_number = mysqli_real_escape_string($dbc,$formElementArray['card_number'.$item_cnt][0]);
        $security_code = mysqli_real_escape_string($dbc,$formElementArray['security_code'.$item_cnt][0]);
        $expiration = mysqli_real_escape_string($dbc,$formElementArray['expiration_date'.$item_cnt][0]);
        $name_on_card = mysqli_real_escape_string($dbc,$formElementArray['name_on_card'.$item_cnt][0]);
        $billing_address = mysqli_real_escape_string($dbc,$formElementArray['billing_address'.$item_cnt][0]);
    }    
    
    if($card_type === '4'){
        $card_number = 'Bill';
        $security_code = '';
        $expiration = '';
    }
  
  if($formValid){
        $insert_array = [];
        $insert_array[] = "'" . $member_id . "'"; // member_id
        if($formStatus === 'add'){
            $insert_array[] = "'" . $card_type . "'"; //card_type   
        }
        $insert_array[] = "'" . $card_number . "'"; //card_number
        $insert_array[] = "'" . $security_code. "'"; //security_code
        $insert_array[] = "'" . $expiration . "'"; //expiration
        $insert_array[] = "'" . $name_on_card . "'"; // name_on_card
        $insert_array[] = "'" . $billing_address . "'"; //billing_address
        $insert_array[] = "'" . $card_icon . "'";// card_icon 

        if($formStatus === 'add'){
          $insert_result = insert_new_pay_option($dbc,$insert_array);
          $return_array[0] = $insert_result ;
        }
        if($formStatus === 'edit'){
            $insert_array[] = "'" .  $payOptopnId . "'";
            $insert_result = update_pay_option($dbc,$insert_array);
            $return_array[0] = $insert_result ;
        }

      }
      else{
        $return_array[0] = false;
      }
      return json_encode($return_array);
    }