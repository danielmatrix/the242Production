<?php
require_once('formValidateFunctions.php');
session_start();

function insert_update_AdLineKeyword($kws_id){
  
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  
  $requiredArray = Array();
  
  $requiredArray = Array(
      'keywords' => 'keywords',
      'description' => 'description',
  );

  $formElementArray = Array();

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

  if($formElementArray['keywords'][3] > 0){
            //process keywords
    $word_file_str = $formElementArray['keywords'][0];
    $word_file_str = preg_replace("/\s+|[^a-zA-Z0-9]/", " " , $word_file_str);
    $word_file_str = strtolower($word_file_str);
    $word_array = explode(' ', $word_file_str);
    array_walk($word_array, function($value, $idx)use (&$word_array, $dbc){
      $word_array[$idx] = mysqli_real_escape_string($dbc,trim($value));
      if(strlen($value) < 2){
       unset($word_array[$idx]);
       prev($word_array);
     } 
    });
    $word_array = array_unique($word_array);
    $keyword_str = implode(' ',$word_array);
    $formElementArray['keywords'][0] = $keyword_str;
  }  

  $insert_adline_keyword_array = [];
            $insert_adline_keyword_array[] = "'" . $kws_id . "'"; // island_id,
            $insert_adline_keyword_array[] = "'" . mysqli_real_escape_string($dbc,trim($formElementArray['description'][0])) . "'"; //description,
            $insert_adline_keyword_array[] = "'" . $formElementArray['keywords'][0] ."'"; //keywords

            if($formValid){
              $results = update_adline_keyword(array_values($insert_adline_keyword_array));
              $return_array[0] =  $results;
            }
            else{
              $return_array[0] = false;
            } //if $formValid

return json_encode($return_array);
}
