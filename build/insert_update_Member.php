<?php
require_once('formValidateFunctions.php');

function insert_update_member($dbc){
    $oldEmail = array_pop($_POST);
    $formStatus = array_pop($_POST);
    array_pop($_POST);
    $formElementArray = $_POST;
    $formValid = true;
    $return_valid_array = array();
    $return_array = array(true);
    $memeber_id = $_SESSION['memberId'];
    
    $requiredArray = array(
    "firstName",
    "lastName",
    "memberEmail",
    "town",
    "island",
    "phone",
    "birthday",
    "sex",
    "password1",
    "password2",
    "agree"
  );
    
    array_walk($formElementArray, function($value, $idx) use (&$formElementArray, &$return_valid_array){
        $formElementArray[$idx][0] =trim(urldecode($formElementArray[$idx][0]));
        $return_valid_array[$idx] = $value[1]($idx,$formElementArray);
    });
    
    foreach($requiredArray as $key => $value){
        $formValid = $formValid  && $return_valid_array[$value];
    }
    
    
    if($formValid){
        $insert_array = [];
        $insert_array[] = "'" . ucwords(strtolower($formElementArray['firstName'][0])) . "'";
        $insert_array[] = "'" . ucwords(strtolower($formElementArray['middleName'][0])) . "'";
        $insert_array[] = "'" . ucwords(strtolower($formElementArray['lastName'][0])) . "'";
        $insert_array[] = "'" . $formElementArray['memberEmail'][0] . "'";
        $insert_array[] = "'" . ucwords(strtolower($formElementArray['town'][0])) . "'";
        $insert_array[] = "'" . ucwords($formElementArray['island'][0]) . "'";
        $insert_array[] = "'" . sha1($formElementArray['password1'][0]) . "'";
        $insert_array[] = "'" . $formElementArray['birthday'][0] . "'";
        $insert_array[] = $formElementArray['sex'][0] === 'female' ? "'F'" : "'M'";
        $insert_array[] = "'" . $formElementArray['phone'][0] . "'";
        if($formStatus === 'add'){
            $insert_result = insert_new_member($dbc,$insert_array);
            $return_array[0] = $insert_result ;
        }
        if($formStatus === 'edit'){
            $insert_array[] = "'" . $memeber_id . "'";
            if(strcmp ( $oldEmail , $formElementArray['memberEmail'][0]) === 0){
                $insert_array[] = "'Y'";    
            }
            else{
                $insert_array[] = "'N'";
            }
            $insert_result = update_member($dbc,$insert_array);
            $return_array[0] = $insert_result ;
        }
    }
    else{
        $return_array[0] = false;
        foreach($return_valid_array as $key => $value){
            if(!$value){
                @$return_array[] = $key;
            }
        }   

    }
    

    return json_encode($return_array);
}
