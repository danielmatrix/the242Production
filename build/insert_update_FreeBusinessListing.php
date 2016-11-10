<?php
require_once('formValidateFunctions.php');
session_start();


function insert_update_free_business_listings($dbc){

  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242"); 

  $formStatus = $_POST['formstatus'];
  $source = 'FB'; 
  if($formStatus === 'edit'){
      $listId =  $_POST['listId']; 
      $searchName = $_POST['searchName'];
      $hours = $_POST['hours'];
      $pre_photo_name = $_POST['previous_photo'];
      $source = $_POST['source'];
  }

  $requiredArray = Array(
    'freeBusinessName' => 'businessname',
    'freeBusinessPhone' => 'phone',
    'freeBusinessAddress' => 'addressname',
    'freeBusinessIsland' => 'island',
    'freeBusinessKeywords' => 'keywords'
  );

  $formElementArray = Array();


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
  if(strlen($_FILES['freeBusinessPhoto']['name']) === 0){
    $file_included = false;
  };

  if($file_included){
    $file_moved = move_uploaded_file($fileArray['freeBusinessPhoto']['tmp_name'], '../images/'.$fileArray['freeBusinessPhoto']['name']);
    $photo_name = $file_moved ?  $fileArray['freeBusinessPhoto']['name'] : '';
  }
  else{
    $photo_name = (strlen($pre_photo_name) > 0) ? $pre_photo_name : '';
  }

  if($formElementArray['freeBusinessKeywords'][3] > 0){
            //process keywords
    $word_file_str = $formElementArray['freeBusinessKeywords'][0];
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
    $formElementArray['freeBusinessKeywords'][0] = $keyword_str;
  }


  $island_id = $formElementArray['freeBusinessIsland'][3];
  $page_name = $formElementArray['freeBusinessName'][0]; 
  $search_display = preg_replace('/\'|"|\.|:|;|!/','',$page_name);
  $search_display = preg_replace("/\s+/", " " , $search_display);
  $page_name = mysqli_real_escape_string($dbc, $page_name);
  $phone_array = explode('-',$formElementArray['freeBusinessPhone'][0]);

  if(strlen($formElementArray[ 'freeBusinessMap' ][0]) > 0 ){
    $map_phone   = "'";
    $map_phone  .= "$island_id#";
    $map_phone  .= $phone_array[1] . '-' . $phone_array[2] . '#';
    $map_phone  .= mysqli_real_escape_string($dbc,$formElementArray[ 'freeBusinessMap' ][0]) ;
    $map_phone  .= "'";
  }
  else{
    $map_phone =  "'". '' . "'";
  }


  $insert_phonelist_array = [];
  $insert_phonelist_array['island_id'] = "'" . $island_id. "'"; // island_id,
  $insert_phonelist_array['page_name'] = "'" . $page_name . "'"; //page_name,
  $insert_phonelist_array['search_display'] = "'" . $search_display . "'"; //search_display,
  $insert_phonelist_array['source'] = "'$source'"; //source,
  $insert_phonelist_array['area_code'] = "'" . $phone_array[0] . "'"; //area_code,
  $insert_phonelist_array['phone_number'] = "'" . $phone_array[1] . '-' . $phone_array[2]  . "'"; // phone_number,
  $insert_phonelist_array['year'] = "'" . date("Y") . "'"; //year,
  $insert_phonelist_array['island_name'] = "'" . $formElementArray['freeBusinessIsland'][0] . "'";// island_name,
  $insert_phonelist_array['email'] = "'" . $formElementArray['freeBusinessEmail'][0]. "'";//email,
  $insert_phonelist_array['image_file'] = "'" . $photo_name . "'";// image_file,
  $insert_phonelist_array['description'] = "'" . mysqli_real_escape_string($dbc,$formElementArray[ 'freeBusinessInfo'][0]) . "'";// description,
  $insert_phonelist_array['postal'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['freeBusinessPostal'][0]) . "'"; //postal
  $insert_phonelist_array['address'] = "'" . mysqli_real_escape_string($dbc,$formElementArray[ 'freeBusinessAddress'][0]) . "'"; //address
  $insert_phonelist_array['member_id'] = "'" . $member_id . "'"; //member_id
  $insert_phonelist_array['web'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['freeBusinessWeb'][0]) . "'"; //freeBusinessWeb
  $insert_phonelist_array['map'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['freeBusinessMap'][0]) . "'"; //freeBusinessMap
  $insert_phonelist_array['hours'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['hours'][0])  . "'";  //hours
  $insert_phonelist_array['keywords'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['freeBusinessKeywords'][0])  . "'";  //keywords
              
  if($formValid){
    if($formStatus === 'add'){
          //$results_array = 'new_list_id' 'rows_in_searchlist'  'search_list_id'    'search_list_entries'   'search_list_list_ids'   'insert_phonelist' 
      $insert_phonelist_array['creator_id'] = "'" . $member_id . "'";
      $results_array= insert_free_business_listing($dbc, $insert_phonelist_array);
      $return_array[0] = $return_array[0] && $results_array[ 'insert_phonelist' ]; 

      //Cut Description to 140 Characters
      $description_len = $formElementArray[ 'freeBusinessInfo' ][0];
      $formElementArray[ 'freeBusinessInfo' ][0] = mysqli_real_escape_string($dbc,substr($formElementArray[ 'freeBusinessInfo' ][0],0,140));
      if(strlen($description_len > 140)){
        $formElementArray[ 'freeBusinessInfo' ] = $formElementArray[ 'freeBusinessInfo' ] . '...';  
      }

      $insert_kws_array = [];
      $insert_kws_array[] = "'" . $search_display . "'"; //search_display,
      $insert_kws_array[] = "'" . '1' . "'";
      $insert_kws_array[] = "'" .$results_array['new_list_id'] . "'";
      $insert_kws_array[] = "'" . mysqli_real_escape_string($dbc,$formElementArray['freeBusinessKeywords'][0])  . "'";  //keywords
      $insert_kws_array[] = "'" . mysqli_real_escape_string($dbc,$formElementArray[ 'freeBusinessInfo' ][0]) . "'";// description,
      $insert_kws_array[] = "'#" . $island_id. "#'";
      $insert_kws_array[] = $map_phone;


      if($results_array ['rows_in_searchlist' ] === 0){
          #insert
        $return_array[0] = $return_array[0] && insert_business_search_list($dbc, $insert_phonelist_array['search_display'] ,$results_array['new_list_id']);
        $return_array[0] = $return_array[0] && insert_business_keyword_search($dbc, $insert_kws_array);
        $return_array[0] = $return_array[0] && insert_listwords($dbc, $word_array);
      }
      
      if($results_array['rows_in_searchlist'] > 0 ){
          #update
        $new_id = $results_array['new_list_id']; 
        $id = "'" . $results_array['search_list_id'] . "'";
        $entries = intval($results_array['search_list_entries']) + 1;
        $entries = "'" .$entries. "'";
        $list_ids = "'" . $results_array[ 'search_list_list_ids' ] . ','  . $new_id . "'";
        $return_array[0] = $return_array[0] && update_search_list($dbc,$id, $entries, $list_ids);
        $return_array[0] = $return_array[0] && insert_listwords($dbc, $word_array);
        $return_array[0] = $return_array[0] && update_business_keyword_search($dbc, "'" . $search_display . "'" ,$island_id, $new_id, str_replace ( "'" , "" , $map_phone ), $word_array);
      }
      
    }

    if($formStatus === 'edit'){
      $sp_search_display =  "'" . $search_display . "'";
      $sp_searchName = "'" . $searchName . "'";

      #update phonelist
      $non_critical_edit = true;
      $sp_listId = "'" . $listId  . "'"; 
      $cksi_array = critical_keyword_search_info($sp_listId);
      extract($cksi_array);
      
      $non_critical_edit = $non_critical_edit && strcmp($search_display, $chk_search_display) === 0;
      $non_critical_edit = $non_critical_edit && strcmp(str_replace("'","",$insert_phonelist_array['phone_number']), $chk_phone_number) === 0;
      $non_critical_edit = $non_critical_edit && strcmp(str_replace("'","",$insert_phonelist_array['island_id']), $chk_island_id) === 0;
      $non_critical_edit = $non_critical_edit && strcmp(str_replace("'","",$insert_phonelist_array['map']), $chk_map) === 0;
      $non_critical_edit = $non_critical_edit && strcmp(str_replace("'","",$insert_phonelist_array['keywords']), $chk_keywords) === 0;
      $non_critical_edit = $non_critical_edit && strcmp($formElementArray[ 'freeBusinessInfo'][0], $chk_description) === 0;

      if($non_critical_edit){
        $return_array[0] = $return_array[0] && update_free_business_listing($dbc, $insert_phonelist_array,$listId);
      }
      else{
          //update phonelist
        $return_array[0] = $return_array[0] && update_free_business_listing($dbc, $insert_phonelist_array,$listId);

          //delete old from search/keyword
        $return_array[0] = $return_array[0] && delete_search_keyword_list($sp_searchName,$sp_search_display);

          #insert search_list
        $keyword_search_info_array = generate_keyword_search_info($sp_searchName);
        $entries_cnt = count(explode(',',$keyword_search_info_array['ids'] )) - 1;

        if($entries_cnt > 0){
          $keywords_array = explode(' ', trim($keyword_search_info_array['keywords']));
          $keywords_array = array_unique($keywords_array);
          $list_ids = substr( $keyword_search_info_array['ids'] , 0 , strlen($keyword_search_info_array['ids']) - 1 );
          $call_str = $sp_searchName . ',' . "'" . $entries_cnt . "'" . ',' . "'" . $list_ids . "'";
          $return_array[0] = $return_array[0] && insert_business_search_list_edit($call_str);
          $return_array[0] = $return_array[0] && insert_listwords($dbc, $keywords_array);
        }

        $keyword_search_info_array = generate_keyword_search_info($sp_search_display);
        $entries_cnt = count(explode(',',$keyword_search_info_array['ids'] )) - 1;

        if($entries_cnt > 0){
          $keywords_array = explode(' ', trim($keyword_search_info_array['keywords']));
          $keywords_array = array_unique($keywords_array);
          $list_ids = substr( $keyword_search_info_array['ids'] , 0 , strlen($keyword_search_info_array['ids']) - 1 );
          $call_str = $sp_search_display . ',' . "'" . $entries_cnt . "'" . ',' . "'" . $list_ids . "'";
          $return_array[0] = $return_array[0] && insert_business_search_list_edit($call_str);
          $return_array[0] = $return_array[0] && insert_listwords($dbc, $keywords_array);
        }

        $keyword_search_info_array = generate_keyword_search_info($sp_searchName);
        $entries_cnt = count(explode(',',$keyword_search_info_array['ids'] )) - 1;                        

        if($entries_cnt > 0){
          $keywords_array = explode(' ', trim($keyword_search_info_array['keywords']));
          $keywords_array = array_unique($keywords_array);
          $keyword_str = implode(' ', $keywords_array );
          $list_ids = substr( $keyword_search_info_array['ids'] , 0 , strlen($keyword_search_info_array['ids']) - 1 );
          $island_ids = substr( $keyword_search_info_array['island_ids'], 0 , strlen($keyword_search_info_array['island_ids']) - 1 );
          $island_ids_array = explode(',', trim($keyword_search_info_array['island_ids']));
          $island_ids_array  = array_unique($island_ids_array);
          $island_ids_str = implode(',' ,$island_ids_array);
          $island_ids_str = substr( $island_ids_str, 0 , strlen($island_ids_str) - 1 );
          $maps_str = substr( $keyword_search_info_array['maps'], 0 , strlen($keyword_search_info_array['maps']) - 1 );

          $insert_kws_array = [];
          $insert_kws_array[] = $sp_searchName; //search_display,
          $insert_kws_array[] = "'" . $entries_cnt . "'";
          $insert_kws_array[] = "'" . $list_ids . "'";
          $insert_kws_array[] = "'" . $keyword_str  . "'";  //keywords
          $insert_kws_array[] = "'" . mysqli_real_escape_string($dbc,$keyword_search_info_array['description']) . "'";// description,
          $insert_kws_array[] = "'" . $island_ids_str . "'";
          $insert_kws_array[] =  "'" . $maps_str . "'";

          $return_array[0] = $return_array[0] && insert_business_keyword_search($dbc, $insert_kws_array);
          $return_array[0] = $return_array[0] && insert_listwords($dbc, $keywords_array);
        }

        $keyword_search_info_array = generate_keyword_search_info($sp_search_display);
        $entries_cnt = count(explode(',',$keyword_search_info_array['ids'] )) - 1;        

        if($entries_cnt > 0){
          $keywords_array = explode(' ', trim($keyword_search_info_array['keywords']));
          $keywords_array = array_unique($keywords_array);
          $keyword_str = implode(' ', $keywords_array );
          $list_ids = substr( $keyword_search_info_array['ids'] , 0 , strlen($keyword_search_info_array['ids']) - 1 );
          $island_ids = substr( $keyword_search_info_array['island_ids'], 0 , strlen($keyword_search_info_array['island_ids']) - 1 );
          $island_ids_array = explode(',', trim($keyword_search_info_array['island_ids']));
          $island_ids_array  = array_unique($island_ids_array);
          $island_ids_str = implode(',' ,$island_ids_array);
          $island_ids_str = substr( $island_ids_str, 0 , strlen($island_ids_str) - 1 );
          $maps_str = substr( $keyword_search_info_array['maps'], 0 , strlen($keyword_search_info_array['maps']) - 1 );

          $insert_kws_array = [];
          $insert_kws_array[] = $sp_search_display; //search_display,
          $insert_kws_array[] = "'" . $entries_cnt . "'";
          $insert_kws_array[] = "'" . $list_ids . "'";
          $insert_kws_array[] = "'" . $keyword_str  . "'";  //keywords
          $insert_kws_array[] = "'" . mysqli_real_escape_string($dbc,$keyword_search_info_array['description']) . "'";// description,
          $insert_kws_array[] = "'" . $island_ids_str . "'";
          $insert_kws_array[] =  "'" . $maps_str . "'";

          $return_array[0] = $return_array[0] && insert_business_keyword_search($dbc, $insert_kws_array);
          $return_array[0] = $return_array[0] && insert_listwords($dbc, $keywords_array);
        }

      }//else

    }//edit

  }//formvalid
            
  else{
    $return_array[0] = false;
  }
  
  return json_encode($return_array);
}//function
