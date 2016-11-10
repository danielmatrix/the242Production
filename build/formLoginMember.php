<?php
require_once('formValidateFunctions.php');
session_start();

// $to      = 'danielbahamas@hotmail.com';
// $subject = 'the242.com needs you to confirm your email address';
// $message =  "Please click on the link below to confirm your email address.\r\n";
// $message .= 'Click to Confirm www.the242.com/confirm_email.php?uid=78';
// $headers = 'From:the242Support' . "\r\n" .
// 'Reply-To: the242Support@gamil.com' . "\r\n"; 

// mail($to, $subject, $message, $headers);

function login_member($dbc){
    array_pop($_POST);
    $formElementArray = $_POST;
    $formValid = true;
    $return_valid_array = array();
    $return_array = array(true);
    
    $requiredArray = array(
    "loginEmail",
    "loginPassword"
  );
    
    array_walk($formElementArray, function($value, $idx) use (&$formElementArray, &$return_valid_array){
        $formElementArray[$idx][0] =trim(urldecode($formElementArray[$idx][0]));
        $return_valid_array[$idx] = $value[1]($idx,$formElementArray);
    });
    
    foreach($requiredArray as $key => $value){
        $formValid = $formValid  && $return_valid_array[$value];
    }
    
    
    if($formValid){
        $query_array = [];
        $query_array[] = "'" . $formElementArray['loginEmail'][0] . "'";
        $query_array[] = "'" . sha1($formElementArray['loginPassword'][0]) . "'";
        $query_result = check_member_login($dbc,$query_array, $return_array);
        $return_array[0] = $query_result ;
 
        if(!$query_result){
            $return_array[1] = "loginEmail";
            $return_array[2] = "loginPassword";
        }
        else{
            $_SESSION['login_email'] = $formElementArray['loginEmail'][0];                       
        }

        if($_SESSION['email_confirmed'] === 'N'){
            $to      = $formElementArray['loginEmail'][0];
            $subject = 'the242.com needs you to confirm your email address';
            $message =  "Please click on the link below to confirm your email address.\r\n";
            $message .= 'Click to Confirm www.the242.com/build/confirm_email.php?uid=' . $_SESSION['memberId'].'&email='.$formElementArray['loginEmail'][0];
            $headers = 'From:the242Support' . "\r\n" .
            'Reply-To: the242Support@gamil.com' . "\r\n"; 

            mail($to, $subject, $message, $headers);

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
