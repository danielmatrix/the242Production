<?php

function firstname($idx,&$formElementArray){
    $valid = (preg_match("/[A-Za-z]{2,20}/", $formElementArray[$idx][0]) === 1);
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Please check first name";  
    return $valid;
}

function middlename($idx,&$formElementArray){
    $valid = (preg_match("/.{1,50}/", $formElementArray[$idx][0]) === 1);
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Please check middle name"; 
    return $valid;
};

function lastname($idx,&$formElementArray){
    $valid =  (preg_match("/[A-Za-z]{2,20}/", $formElementArray[$idx][0]) === 1);
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Please check last name";  
    return $valid;
};

function emailunique($idx,&$formElementArray){
    #   Connect to  database
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242"); 
    $email = $formElementArray[$idx][0];   
    $valid_email = (preg_match('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $email) === 1);
    if($email !== $_SESSION['email']){
      $select_wl_d = @mysqli_query($dbc,"CALL check_email_exist('$email')");    
      $row_wl = mysqli_fetch_all($select_wl_d);
      $unique_email = $row_wl[0][0] === '0';
      $valid =  ($valid_email && $unique_email) ;
    }
    else{
      $valid = true;  
    }
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Email may already be in use. Please check the email.";  
    return $valid;
};

function town($idx,&$formElementArray){
    $valid =  (preg_match("/[A-Za-z]{2,20}/", $formElementArray[$idx][0]) === 1);
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Please check town"; 
    return $valid;
};

function island($idx,&$formElementArray){
     #   Connect to  database
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $valid = false;
    $island = $formElementArray[$idx][0];
    $select_wl_d = @mysqli_query($dbc,"CALL check_island_exist('$island')");
    $row_wl = mysqli_fetch_all($select_wl_d);
    $valid = $row_wl[0][0] === '1';
    $formElementArray[$idx][] = $valid;
    $formElementArray[$idx][] = $row_wl[0][1];
    return $valid;
};

function phone($idx,&$formElementArray){
    $valid = (preg_match("/^\d{3}-\d{3}-\d{4}$/", $formElementArray[$idx][0]) === 1);
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Please check phone"; 
    return $valid;
};

function birthday($idx,&$formElementArray){
    $dateArray = explode('/', $formElementArray[$idx][0]);
    $mm = (int)$dateArray[0];
    $dd = (int)$dateArray[1];
    $yy = (int)$dateArray[2];
    $valid = checkdate($mm,$dd,$yy);
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Check birthday"; 
    return $valid;
};

function radiomutex($idx,&$formElementArray){
    $valid = strlen($formElementArray[$idx][0]) > 0;
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Check sex";
    return $valid;
};


function passwordconfirm($idx,&$formElementArray){
    $password1 = $formElementArray['password1'][0];
    $password2 = $formElementArray['password2'][0];
    $valid = true;
    $valid  = $valid && (strlen($password1) > 4 && strlen($password1) > 4 );
    $valid = $valid && ($password1 ===  $password2);
    $formElementArray[$idx][] = $valid; 
    return $valid;
};

function checkedconfirm($idx,&$formElementArray){
    $valid = strlen($formElementArray[$idx][0]) > 0;
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Please check agree to terms";
    return $valid;
};

function emailvalid($idx,&$formElementArray){
    $email = $formElementArray[$idx][0];
    $valid = (preg_match('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $email) === 1);
    $formElementArray[$idx][] = $valid;
    return $valid;
};

function passwordvalid($idx,&$formElementArray){
    $password = $formElementArray['loginPassword'][0];
    $valid  = strlen($password) > 4; 
    $formElementArray[$idx][] = $valid;
    return $valid;
};

 function check_file_type_size($size, &$fileArray, $member_id){
    $fileValid = true;
    array_walk( $fileArray, function($value, $idx) use($fileValid, $size, $member_id, &$fileArray){
        $fileArray[$idx]['name'] = 'img_' . $member_id . '_' . $value['name'];
        $fileValid = (preg_match("/^image\/png|image\/gif|image\/jpeg|image\/jpg$/",$value['type']) === 1);
        $fileValid = $fileValid &&( (int)$value['size'] <= $size);
    });
    return $fileValid;
 }

function businessname($idx,&$formElementArray){
    $valid = (preg_match("/.{2,50}/", $formElementArray[$idx][0]) === 1);
    $formElementArray[$idx][] = $valid; 
    $formElementArray[$idx][] = $valid ? "" : "Please check business name";  
    return $valid;
}

function addressname($idx,&$formElementArray){
   $valid = (preg_match("/.{1,200}/", $formElementArray[$idx][0]) === 1);
   $formElementArray[$idx][] = $valid;
   $formElementArray[$idx][] = $valid ? "" : "Please check business name";
   return $valid;
}

function keywords($idx,&$formElementArray){
   $valid = false;
   $keywords = $formElementArray[$idx][0];
   $valid = true;
   $formElementArray[$idx][] = $valid;
   $formElementArray[$idx][] = strlen($keywords) ;
   return $valid;
 }

function productname($idx,&$formElementArray){
   $valid = (preg_match("/.{2,75}/", $formElementArray[$idx][0]) === 1);
   $formElementArray[$idx][] = $valid;
   $formElementArray[$idx][] = $valid ? "" : "Please check product name";
   return $valid;
  }
 
function price($idx,&$formElementArray){
   $valid = (preg_match(" /^\d+\.\d\d$/", $formElementArray[$idx][0]) === 1);
   $formElementArray[$idx][] = $valid;
   $formElementArray[$idx][] = $valid ? "" : "Please check product price";
   return $valid;
}

function description($idx,&$formElementArray){
   $valid = (preg_match("/.{2,}/", $formElementArray[$idx][0]) === 1);
   $formElementArray[$idx][] = $valid;
   $formElementArray[$idx][] = $valid ? "" : "Please check Description";
   return $valid;
}

 function check_single_file_type_size($size, &$fileArray, $member_id){
     $fileValid = true;
     $fileValid = (preg_match("/^image\/png|image\/gif|image\/jpeg$/",$fileArray['type']) === 1);
     $fileValid = $fileValid &&( (int)$fileArray['size'] <= $size);
     return $fileValid;
 }