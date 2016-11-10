<?PHP
session_start();

function deleteCreatorListing(){
  $member_id = $_SESSION['memberId'];
  $return_array = array(true);
  $search_display = "'" . $_POST['seacrhname'] . "'";

  $delete_phonelist_array = [];
  $delete_phonelist_array['listId'] = "'" . $_POST['listId'] . "'";
  $delete_phonelist_array['creatorId'] = "'" . $member_id . "'";

  if($_POST['source'] === 'FP'){
      $results = delete_creator_listing(array_values($delete_phonelist_array));
      $return_array[0] = $return_array[0] && $results;
      if($return_array[0]){
          $call_str = $search_display;
          $results = delete_creator_search_listing($call_str);
          $return_array[0] = $return_array[0] && $results;
      }
    return json_encode($return_array);
  }

  if($_POST['source'] === 'FB' || $_POST['source'] === 'PB'){
    $row_exist_cnt = check_listing_exist($search_display);
    
    if($row_exist_cnt === '1'){
      $results = delete_creator_listing(array_values($delete_phonelist_array));
      $return_array[0] = $return_array[0] && $results;
      if($return_array[0]){
          $call_str = $search_display;
          $results = delete_creator_search_listing($call_str);
          $return_array[0] = $return_array[0] && $results;
          $results = delete_creator_keyword_listing($call_str);
          $return_array[0] = $return_array[0] && $results;
      }
    }

    if(intval($row_exist_cnt) > 1){
      //delete listing
      $results = delete_creator_listing(array_values($delete_phonelist_array));
      $return_array[0] = $return_array[0] && $results;

      $return_array[0] = $return_array[0] && delete_search_keyword_list($search_display,$search_display);

                              #insert search_list
      $keyword_search_info_array = generate_keyword_search_info($search_display);
      $entries_cnt = count(explode(',',$keyword_search_info_array['ids'] )) - 1;
                        
      if($entries_cnt > 0){
        $keywords_array = explode(' ', trim($keyword_search_info_array['keywords']));
        $keywords_array = array_unique($keywords_array);
        $list_ids = substr( $keyword_search_info_array['ids'] , 0 , strlen($keyword_search_info_array['ids']) - 1 );
        $call_str = $search_display . ',' . "'" . $entries_cnt . "'" . ',' . "'" . $list_ids . "'";
        $return_array[0] = $return_array[0] && insert_business_search_list_edit($call_str);
      }
                        
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
        $insert_kws_array[] = $search_display; //search_display,
        $insert_kws_array[] = "'" . $entries_cnt . "'";
        $insert_kws_array[] = "'" . $list_ids . "'";
        $insert_kws_array[] = "'" . $keyword_str  . "'";  //keywords
        $insert_kws_array[] = "'" . $keyword_search_info_array['description'] . "'";// description,
        $insert_kws_array[] = "'" . $island_ids_str . "'";
        $insert_kws_array[] =  "'" . $maps_str . "'";
    
        $return_array[0] = $return_array[0] && insert_business_keyword_search($dbc, $insert_kws_array);
      }

    }
    
  }
  return json_encode($return_array);  
}//deleteCreatorListing