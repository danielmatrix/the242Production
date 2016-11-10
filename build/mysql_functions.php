<?php

function display_search_list($dbc){
	$clean_lookup = trim($_POST['lookup']);
	
	$list_lookup = explode(' ',$clean_lookup);
	$list_lookup_str = implode('% ',$list_lookup) .'%';

	if(!empty($list_lookup_str)){
		$select_wl_d = @mysqli_query($dbc,"CALL search_list('$list_lookup_str')");
		$row_wl = mysqli_fetch_all($select_wl_d);
		$jason_str = json_encode($row_wl);
		return $jason_str;	
	}	
}

function display_listings($dbc){
	$clean_lookup = mysqli_real_escape_string($dbc,trim($_POST['ids']));

	$listing_sql  = "SELECT id, page_name, phone_number, address, island_name, island_id, postal_code, email, website, image_file, hours, map, description, member_id, banner, area_code, source, storefront_img ";
	$listing_sql .= "FROM the242.phonelist ";
	$listing_sql .= "WHERE id IN ($clean_lookup) ";
 	
	if(!empty($clean_lookup)){
		$select_listings = @mysqli_query($dbc,$listing_sql);
		$row_listings = mysqli_fetch_all($select_listings);
		$jason_str = json_encode($row_listings);
		return $jason_str;		
	}
}

function display_listwords($dbc){
	$clean_lookup = trim($_POST['lookup']);
	
	$list_lookup = explode(' ',$clean_lookup);
	$list_lookup_str = array_pop($list_lookup);
	$list_lookup_str .= '%';
	if(!empty($list_lookup_str)){
		$select_wl_d = @mysqli_query($dbc,"CALL listwords('$list_lookup_str')");
		$row_wl = mysqli_fetch_all($select_wl_d);
		$jason_str = json_encode($row_wl);
		return $jason_str;	
	}	
}

function productwords($dbc){
  $clean_lookup = trim($_POST['lookup']);
  $list_lookup = explode(' ',$clean_lookup);
  $list_lookup_str = array_pop($list_lookup);
  $list_lookup_str .= '%';
  if(!empty($list_lookup_str)){
    $select_wl_d = @mysqli_query($dbc,"CALL productwords('$list_lookup_str')");
    $row_wl = mysqli_fetch_all($select_wl_d);
    $jason_str = json_encode($row_wl);
    return $jason_str;  
  } 
}

function display_ps_search($dbc){
	$clean_lookup = trim($_POST['ps_search_str']);
	$list_lookup = explode(' ',$clean_lookup);
	array_walk($list_lookup,function(&$value, $index){
    $value =  "+" . trim($value) . "*";});
	$search_str = implode('  ', $list_lookup);
	$search_str = trim($search_str);
	if(!empty($search_str)){
		$select_kws_d = @mysqli_query($dbc,"CALL keyword_search('$search_str')");
		$row_kws = mysqli_fetch_all($select_kws_d);
		shuffle($row_kws);
    $jason_str = json_encode($row_kws);
    		return $jason_str;	
	}	
}

function product_keyword_search(){
    $product_company_array = Array();
    $locations_array = Array();
    $return_array = Array();  
    $clean_lookup = trim($_POST['ps_search_str']);
    $list_lookup = explode(' ',$clean_lookup);
    array_walk($list_lookup,function(&$value, $index){
      $value =  "+" . trim($value) . "*";
    });
    $search_str = implode('  ', $list_lookup);
    $search_str = trim($search_str);
    $return_array = Array();
    if(!empty($search_str)){
      $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
      mysqli_select_db ($dbc, "the242");
        $select = @mysqli_query($dbc,"CALL product_keyword_search('$search_str')");
        $result_array = mysqli_fetch_all($select);

        array_walk($result_array, function($value, $idx) use (&$product_company_array, &$locations_array){
            $product_company_array[$value[0]] =   $value;
            $locations_array[$value[0]] = Array();
        });        

        array_walk($result_array, function($value, $idx) use (&$product_company_array, &$locations_array){
            array_push($locations_array[$value[0]], $value[12]);
        });

        array_walk($product_company_array, function($value, $idx) use (&$return_array, $locations_array){
          array_push($return_array,Array( 
          $value[0],
          $value[1],
          $value[2],
          $value[3],
          $value[4],
          $value[5],
          $value[6],
          $value[7],
          $value[8],
          $value[9],
          $value[10],
          $value[11],
          $locations_array[$idx]) );
        });
    shuffle($return_array);    
    $jason_str = json_encode($return_array);
    return $jason_str;  
    }   
}

function getDisplaySeasonProducts($product_ids){
  $product_company_array = Array();
  $locations_array = Array();
  $return_array = Array();
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $listing_sql  = 'SELECT   products_id,list_name, description, products.product_name, season_price,image, on_line_purchase, website, listing_products.location ';
  $listing_sql .= 'FROM the242.products INNER JOIN listing_products ON products.products_id = listing_products.product_id ';
  $listing_sql .= "WHERE products.products_id  IN($product_ids)";
  $select = @mysqli_query($dbc,$listing_sql);
  $result_array = mysqli_fetch_all($select);
  shuffle($result_array);

  array_walk($result_array, function($value, $idx) use (&$product_company_array, &$locations_array){
      $product_company_array[$value[0]] =   $value;
      $locations_array[$value[0]] = Array();
  });        

  array_walk($result_array, function($value, $idx) use (&$product_company_array, &$locations_array){
      array_push($locations_array[$value[0]], $value[8]);
  });

  array_walk($product_company_array, function($value, $idx) use (&$return_array, $locations_array){
    array_push($return_array,Array( 
    $value[0],
    $value[1],
    $value[2],
    $value[3],
    $value[4],
    $value[5],
    $value[6],
    $value[7],
    $value[8],
    $value[9],
    $value[10],
    $value[11],
    $locations_array[$idx]) );
  });
  $jason_str = json_encode($return_array);
  return $jason_str;       
}


// function getDisplaySeasonProducts($product_ids){
//   $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
//   mysqli_select_db ($dbc, "the242");
//   $listing_sql  = 'SELECT   products_id,list_name, description, products.product_name, season_price,image, on_line_purchase, website, listing_products.location ';
//   $listing_sql .= 'FROM the242.products INNER JOIN listing_products ON products.products_id = listing_products.product_id ';
//   $listing_sql .= 'WHERE products.products_id  IN($product_ids)';
//   $select_listings = @mysqli_query($dbc,$listing_sql);
//   $row_listings = mysqli_fetch_all($select_listings);
//   $jason_str = json_encode($row_listings);
//   return $jason_str;      
// }

function display_bp_list($dbc){
	$clean_lookup = trim($_POST['lookup']);
	
	$list_lookup = explode(' ',$clean_lookup);
	$list_lookup_str = implode('% ',$list_lookup) .'%';

	if(!empty($list_lookup_str)){
		$select_wl_d = @mysqli_query($dbc,"CALL bp_search('$list_lookup_str')");
		$row_wl = mysqli_fetch_all($select_wl_d);
		$jason_str = json_encode($row_wl);
		return $jason_str;	
	}	
}

function display_bp_company($dbc){
		$select_wl_d = @mysqli_query($dbc,"CALL bp_company({$_POST['bp_id']})");
		$row_wl = mysqli_fetch_all($select_wl_d);
		$jason_str = json_encode($row_wl);
		return $jason_str;		
}

function insert_new_member($dbc, $insert_array){
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_new_member($call_str)");
    $result = $insert_result ? true : false;
    return $result;
}

function check_member_login($dbc, $query_array, &$return_array){
    $call_str = implode(',', $query_array);
    $select_wl_d = @mysqli_query($dbc,"CALL login_member($call_str)");
    $row_wl = mysqli_fetch_all($select_wl_d);
    $result = $row_wl[0][0] === '1';
    $return_array[1] = (int)$row_wl[0][1];
    $_SESSION['memberId'] = (int)$row_wl[0][2];
    $_SESSION['email'] = $row_wl[0][3];
    $_SESSION['email_confirmed'] = $row_wl[0][4];
    return $result;
}

function add_to_my_listings($dbc, $member_id, $list_id, $source){
		$source = "'" . $source . "'";
    $select_wl_d = @mysqli_query($dbc,"CALL add_to_my_list($list_id,$member_id,$source)");
    $row_update = mysqli_affected_rows($dbc); 
    $return_array = array();
    $return_array[] = $row_update > 0 ? true : false;
    $jason_str = json_encode( $return_array );
    return $jason_str;
}


function removeFromMyListings($dbc,$list_id){
    $return_array = array();
    $return_array[0] = @mysqli_query($dbc,"CALL removeFromMyListings($list_id)");
    $json_str = json_encode( $return_array );
    return $json_str;
}

function deleteHelpWanted($id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db($dbc, "the242");
  $return_array = array();
  $return_array[0] = @mysqli_query($dbc,"CALL deleteHelpWanted($id)");
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db($dbc, "the242");  
  $return_array[0] = @mysqli_query($dbc,"CALL delete_help_wanted_company($id)");
  $json_str = json_encode($return_array);
  return $json_str;
}

function deleteAllHelpWanted($list_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db($dbc, "the242");
  $return_array = array();
  $return_array[0] = @mysqli_query($dbc,"CALL deleteAllHelpWanted($list_id)");
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db($dbc, "the242");  
  $return_array[0] = @mysqli_query($dbc,"CALL delete_help_wanted_company_all($list_id)");
  $json_str = json_encode($return_array);
  return $json_str;
}

function delete_help_wanted_member($member_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db($dbc, "the242");
  $return_array = array();
  $return_array[0] = @mysqli_query($dbc,"CALL delete_help_wanted_member($member_id)");
  $json_str = json_encode($return_array);
  return $json_str;
}

function get_classified_active(){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db($dbc, "the242");  
  $select_listings = @mysqli_query($dbc,"CALL get_classified_active()");
  $row_listings = mysqli_fetch_all($select_listings);
  $jason_str = json_encode($row_listings);
  return $jason_str;    
}

function get_for_rent_active(){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db($dbc, "the242");  
  $select_listings = @mysqli_query($dbc,"CALL get_for_rent_active()");
  $row_listings = mysqli_fetch_all($select_listings);
  $jason_str = json_encode($row_listings);
  return $jason_str;    
}

function insert_new_personal_listing($dbc, $insert_array, $search_dispaly){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db($dbc, "the242");
    $exist_result = @mysqli_query($dbc,"CALL check_listing_exist($search_dispaly)");
    $row_exist_cnt = mysqli_fetch_assoc($exist_result);
    if($row_exist_cnt['CNT'] === '0'){
        $call_str = implode(',', $insert_array);
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
        mysqli_select_db ($dbc, "the242");
        $insert_result = @mysqli_query($dbc,"CALL insert_personal_listing($call_str)");
        $getLastInsertID = @mysqli_query($dbc,'Select LAST_INSERT_ID()');
        $row_wl = mysqli_fetch_all($getLastInsertID);
        $record_id = $row_wl[0][0];
        $call_str2 = $insert_array[2] . ',' . "'". '1' ."'," ."'" . $record_id . "'";
        $insert_result2 = @mysqli_query($dbc,"CALL insert_personal_search_list($call_str2)");    //list_name`, `entries`, `list_ids
        $result = $insert_result && $insert_result2;
        return $result;
    }
    else{
        return 'Sorry, Name already in use.';    
    }
}

function edit_member($dbc, $member_id){
    $select_wl_d = @mysqli_query($dbc,"CALL edit_member($member_id)");
    $row_wl = mysqli_fetch_assoc($select_wl_d);
    return $row_wl;
}

function update_member($dbc, $insert_array){
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_member($call_str)");
    $result = $insert_result ? true : false;
    return $result;
}

function edit_free_personal($dbc, $listId){
    $select_wl_d = @mysqli_query($dbc,"CALL edit_free_personal($listId)");
    $row_wl = mysqli_fetch_assoc($select_wl_d);
    return $row_wl;
}

function update_free_personal($dbc, $insert_array, $searchName = ''){
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_free_personal($call_str)");
    $result = $insert_result ? true : false;
    $newName = str_replace("'", '',$insert_array[2]);
    if(strcmp($searchName,$newName) !== 0){
    	$call_str2 = "'" . $searchName ."'," . "'" . $newName . "'";
    	$insert_result2 = @mysqli_query($dbc,"CALL update_search_free_personal($call_str2)");
    	$result = $insert_result && $insert_result2; 
    }

    return $result;
}

function generate_keyword_search_info($searchName){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    
    $keyword_search_info_array = array();
    $keyword_search_info_array['ids'] = '';
    $keyword_search_info_array['island_ids'] = '';
    $keyword_search_info_array['maps'] = '';
    $keyword_search_info_array['keywords'] = '';
    $keyword_search_info_array['description'] = '';
        
    $sql_result =  mysqli_query($dbc,"CALL generate_keyword_search_info($searchName)");
    while($row_wl = mysqli_fetch_assoc($sql_result)){
        $keyword_search_info_array['description'] = $row_wl['description']; 
        $keyword_search_info_array['ids'] = $keyword_search_info_array['ids'] . $row_wl['id']  .',';
        $keyword_search_info_array['island_ids'] = $keyword_search_info_array['island_ids'] .  '#' . $row_wl['island_id'] . '#,';
        if(strlen($row_wl['map']) > 0){
            $keyword_search_info_array['maps'] = $keyword_search_info_array['maps'] . $row_wl['island_id'] . '#' . $row_wl['phone_number'] . '#' . $row_wl['map'] . ':';
        }
        if(strlen($row_wl['keywords']) > 0){
            $keyword_search_info_array['keywords'] = $keyword_search_info_array['keywords'] . ' ' . $row_wl['keywords'];
        }    
     }
    return $keyword_search_info_array;
}

function insert_free_business_listing($dbc, $insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_free_business($call_str)");
    $getLastInsertID = @mysqli_query($dbc,'Select LAST_INSERT_ID()');
    $row_wl = mysqli_fetch_all($getLastInsertID);
    $record_id = $row_wl[0][0];

    $call_str2 = $insert_array['search_display'];
    $sql_result = @mysqli_query($dbc,"CALL check_search_list_exist($call_str2)");
    $row_wl = mysqli_fetch_all($sql_result);
    $num_of_rows = @mysqli_num_rows ( $sql_result );
    return array('new_list_id' => $record_id, 'rows_in_searchlist' => $num_of_rows, 'search_list_id' => $row_wl[0][0],  'search_list_entries' => $row_wl[0][1], 'search_list_list_ids' =>$row_wl[0][2], 'insert_phonelist' =>$insert_result );
}

function update_free_business_listing($dbc, $insert_array, $listId){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $call_str = "'" . $listId ."'," . $call_str;
    $update_result = @mysqli_query($dbc,"CALL update_free_business($call_str)");
    return $update_result;
}
    
function insert_business_search_list($dbc, $list_name, $record_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = $list_name .",'". '1' ."'," ."'" . $record_id . "'";
    $insert_result = @mysqli_query($dbc,"CALL insert_business_search_list($call_str)");
    return $insert_result;
}

function update_search_list($dbc,$id, $entries, $list_ids){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $insert_result = @mysqli_query($dbc,"CALL update_search_list($id, $entries, $list_ids)");
    return  $insert_result;    
}

function insert_business_keyword_search($dbc, $insert_kws_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_kws_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_business_keyword_search($call_str)");
    return $insert_result;
}

function insert_listwords($dbc, $keywords_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    array_walk($keywords_array, function($value, $idx)use (&$keywords_array){
        $keywords_array[$idx] = "('" . $keywords_array[$idx] . "')";});
    $insert_keywords = implode(',', $keywords_array);
    $insert_sql  = 'INSERT IGNORE into listwords (listword) ';
    $insert_sql .= "VALUES $insert_keywords";
    $insert_result =@mysqli_query($dbc, $insert_sql); 
    return  $insert_result;  
}

function update_business_keyword_search($dbc, $search, $new_island_id, $new_id, $new_map_phone, $word_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    
    $sql_result =  @mysqli_query($dbc,"CALL get_business_keyword_search($search)");
    $row_wl = mysqli_fetch_assoc($sql_result); 
    extract($row_wl) ;
    $new_island_id = '#'.$new_island_id.'#';

    $in_id = $id;
    $in_entries =  intval($entries) + 1;
    $in_list_ids = $list_ids;
    $in_island_ids = $island_ids;
    $previous_map = strlen($map_phone) > 0 ? true : false;
    if($previous_map){ 
        $in_map_phone = $map_phone;
    }
            
    if(strpos ( $island_ids, $new_island_id  ) === false){
        $in_island_ids = $island_ids . ',' . $new_island_id;
    }
    
    if(strpos ( $list_ids , $new_id ) === false){
        $in_list_ids = $list_ids . ',' . $new_id;
    }
    
    if(strlen($new_map_phone) > 0){
      if(strpos ( $map_phone , $new_map_phone ) === false && $previous_map){
          $in_map_phone = $map_phone . ':' . $new_map_phone;
      }
    }

    $keyword_array = explode(' ',$keywords);
    $keyword_array = array_merge($keyword_array, $word_array);
    $keyword_array = array_unique ($keyword_array);
    $in_keywords = "'" . implode(' ', $keyword_array) . "'";
    
    $in_id = "'" . $in_id . "'";
    $in_entries = "'" . $in_entries . "'"; 
    $in_list_ids = "'" . $in_list_ids . "'";
    $in_island_ids = "'" . $in_island_ids . "'";
    $in_map_phone = "'" . $in_map_phone . "'";

    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");

    $result = @mysqli_query($dbc,"CALL update_business_keyword_search($in_id,$in_entries,$in_list_ids,$in_keywords,$in_island_ids, $in_map_phone)");
    
    return $result;
}

function insert_new_pay_option($dbc,$insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_pay_option($call_str)");
    return $insert_result;
}

function update_pay_option($dbc,$insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_pay_option($call_str)");
    return $insert_result;
}

function delete_pay_option($dbc,$pay_option_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = "'" . $pay_option_id . "'";
    $insert_result = Array();
    $insert_result[] = @mysqli_query($dbc,"CALL delete_pay_option($call_str)");
    return json_encode($insert_result);
}

function get_premium_business_name($list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = "'" . $list_id . "'";
    $sql_result = @mysqli_query($dbc,"CALL get_premium_business($call_str)");
    $row_wl = mysqli_fetch_assoc($sql_result);    
    return Array($row_wl['business'],$row_wl['payment_option'], $row_wl['island_id'], $row_wl['map'], $row_wl['search_display'], $row_wl['phone_number'], $row_wl['website'], $row_wl['area_code'], $row_wl['email'], $row_wl['address']);
}

function update_multi_billing_info_listings($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_multi_billing_info_listings($call_str)");
    return $insert_result;    
}

function update_single_billing_info_listings($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_single_billing_info_listings($call_str)");
    return $insert_result;    
}

function remove_premium_listings($list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = "'" . $list_id . "'";
    $insert_result = Array();
    $insert_result[] = @mysqli_query($dbc,"CALL remove_premium($call_str)");
    return json_encode($insert_result); 
}

function get_business_banner($list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = "'" . $list_id . "'";
    $sql_result = @mysqli_query($dbc,"CALL select_banner($call_str)");
    $row_wl = mysqli_fetch_assoc($sql_result);    
    return $row_wl['banner'];
}

function update_banner($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_banner($call_str)");
    return $insert_result;
}

function get_MapPicture($list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = "'" . $list_id . "'";
    $sql_result = @mysqli_query($dbc,"CALL select_MapPicture($call_str)");
    $row_wl = mysqli_fetch_assoc($sql_result);    
    return $row_wl['storefront_img'];
}

function update_MapPicture($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_MapPicture($call_str)");
    return $insert_result;
}

function update_confirm_email($uid){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $insert_result = @mysqli_query($dbc,"CALL update_confirm_email($uid)");
    return $insert_result;
}

function delete_creator_listing($delete_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $delete_array);
    $delete_result = @mysqli_query($dbc,"CALL delete_creator_listing($call_str)");
    return $delete_result;    
}

function delete_creator_search_listing($call_str){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");  
    $delete_result = @mysqli_query($dbc,"CALL delete_creator_search_listing($call_str)");
    return $delete_result;
}

function delete_creator_keyword_listing($call_str){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");  
    $delete_result = @mysqli_query($dbc,"CALL delete_creator_keyword_listing($call_str)");
    return $delete_result;
}

function critical_keyword_search_info($sp_listId){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL critical_keyword_search_info($sp_listId)");
    $row_wl = mysqli_fetch_assoc($sql_result);
   return $row_wl;
}

function delete_search_keyword_list($sp_searchName,$sp_search_display){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $result = @mysqli_query($dbc,"CALL delete_search_keyword_list($sp_searchName,$sp_search_display)");
    return $result;
}

function insert_business_search_list_edit($call_str){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $insert_result = @mysqli_query($dbc,"CALL insert_business_search_list($call_str)");
    return $insert_result;
}

function check_listing_exist($search_display){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $exist_result = @mysqli_query($dbc,"CALL check_listing_exist($search_display)");
    $row_exist_cnt = mysqli_fetch_assoc($exist_result);
    return $row_exist_cnt['CNT'];
}

function check_pay_options_exist($member_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = "'" . $member_id . "'";
    $count_result = @mysqli_query($dbc,"CALL check_pay_options_exist($call_str)");
    $row_cnt = mysqli_fetch_assoc($count_result);
    return $row_cnt['CNT'];    
}

function get_product_categories(){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $html_result = @mysqli_query($dbc,"CALL get_product_categories()");
    $html_catagories = mysqli_fetch_all($html_result);
    return $html_catagories;
}

function get_product_subcategories($catagory_id){
    $call_str = "'" . $catagory_id . "'";
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $html_result = @mysqli_query($dbc,"CALL get_product_subcategories($call_str)");
    $html_subcatagories = mysqli_fetch_all($html_result);
    $subcatagory_html = '';
    for($i = 0, $len = count($html_subcatagories); $i < $len; $i++){
        $subcatagory_html .= '<li><a data-element="aSubCatagorySelect" href="#">' . $html_subcatagories[$i][0]  . '</a></li>';
    }
    return $subcatagory_html;
}

function get_service_categories(){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $html_result = @mysqli_query($dbc,"CALL get_service_categories()");
    $html_catagories = mysqli_fetch_all($html_result);
    return $html_catagories;
}

function get_service_subcategories($catagory_id){
    $call_str = "'" . $catagory_id . "'";
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $html_result = @mysqli_query($dbc,"CALL get_service_subcategories($call_str)");
    $html_subcatagories = mysqli_fetch_all($html_result);
    $subcatagory_html = '';
    for($i = 0, $len = count($html_subcatagories); $i < $len; $i++){
        $subcatagory_html .= '<li><a data-element="aServiceSubCatagorySelect" href="#">' . $html_subcatagories[$i][0]  . '</a></li>';
    }
    return $subcatagory_html;
}

function insert_productwords($keywords_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    array_walk($keywords_array, function($value, $idx)use (&$keywords_array){
        $keywords_array[$idx] = "('" . $keywords_array[$idx] . "')";});
        $insert_keywords = implode(',', $keywords_array);
        $insert_sql  = 'INSERT IGNORE into productwords (productword) ';
        $insert_sql .= "VALUES $insert_keywords";
        $insert_result =@mysqli_query($dbc, $insert_sql);
        return  $insert_result;
}

function insert_listing_product($listing_id, $product_id,$product_name, $thumbnail, $location){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $insert_result = @mysqli_query($dbc,"CALL insert_listing_product($listing_id,$product_id,$product_name, $thumbnail, $location)");
    return $insert_result;    
}

function insert_product_service($insert_array,$return_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_product_service($call_str)");
    $return_array[0] = $insert_result;
    $getLastInsertID = @mysqli_query($dbc,'Select LAST_INSERT_ID()');
    $row_wl = mysqli_fetch_all($getLastInsertID);
    $return_array[1] = $row_wl[0][0];
    return $return_array;
}

function insert_multi_listings_products($list_product_array ){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    array_walk($list_product_array, function($value, $idx)use (&$list_product_array){
      $list_product_array[$idx] = "(" . $value[0] . "," . $value[1] . "," .$value[2]. "," .$value[3] .",".$value[4].")";
    });
    $insert_list_product = implode(',', $list_product_array);
    $insert_sql  = 'INSERT IGNORE INTO listing_products(listing_id,product_id,product_name, thumbnail, location) ';
    $insert_sql .= "VALUES $insert_list_product";
    $insert_result =@mysqli_query($dbc, $insert_sql);
    return  $insert_result;
}

function get_listings_products_info($search_name){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_listings_products_info($search_name)");
    $row_wl = mysqli_fetch_all($sql_result);
    return $row_wl;    
}

function update_banner_all($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_banner_all($call_str)");
    return $insert_result;
}

function remove_product_from_listings($product_id, $list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array = Array();
    $return_array[0] = @mysqli_query($dbc,"CALL remove_product_from_listings($product_id, $list_id)");
    return json_encode($return_array);
}

function remove_all_products_from_listings($list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array = Array();
    $return_array[0] = @mysqli_query($dbc,"CALL remove_all_products_from_listings($list_id)");
    return json_encode($return_array);
}

function get_listings_products_info2($list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_listings_products_info2($list_id)");
    $row_wl = mysqli_fetch_assoc($sql_result);
    $location = "'". '#'.$row_wl['island_id'].'#'.':'.$list_id.':'.$row_wl['phone_number'].':'.$row_wl['map']."'";
    return $location;    
}

function add_all_product_to_listing($list_id, $member_id, $location){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array = Array();
    $return_array[0] = @mysqli_query($dbc,"CALL add_all_product_to_listing($list_id, $member_id, $location)");
    return json_encode($return_array);
}


function edit_product_info($product_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $get_info = @mysqli_query($dbc,"CALL edit_product_info($product_id)");
  $row_info = mysqli_fetch_assoc($get_info);
  $row_info['product_name'] = stripslashes($row_info['product_name']);
  $row_info['description'] = stripslashes($row_info['description']);
  $row_info['image'] = stripcslashes($row_info['image']);

  if($row_info['sale_end_date'] === '1900-01-01'){
      $row_info['sale_end_date'] = '';
  }
  else{
      $dateArray = explode('-', $row_info['sale_end_date'] ) ;
      $row_info['sale_end_date'] = $dateArray[1] . '/' . $dateArray[2] . '/' . $dateArray[0];
  }
  return $row_info;
}

function delete_product_from_listings($product_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array = Array();
    $return_array[0] = @mysqli_query($dbc,"CALL delete_product_from_listings($product_id)");
    return json_encode($return_array);
}

function delete_product($product_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array = Array();
    $return_array[0] = @mysqli_query($dbc,"CALL delete_product($product_id)");
    return json_encode($return_array);
}

// function update_products_keyword_search($product_new_info_array){
//     $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
//     mysqli_select_db ($dbc, "the242");
//     $call_str = implode(',', $product_new_info_array);
//     $return_array = Array();
//     $return_array[0] = @mysqli_query($dbc,"CALL update_products_keyword_search($call_str)");
//     return $return_array[0];
// }

function getListDisplayProductsServices($product_ids){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $listing_sql  = "SELECT products_id,list_name, description,product_name, price, sale_enabled, sale_price, date_format(sale_end_date,'%a %b %D, %Y') AS sale_end_date, in_stock, image, on_line_purchase, website ";
  $listing_sql .= "FROM the242.products ";
  $listing_sql .= "WHERE products_id IN($product_ids)";
  $select_listings = @mysqli_query($dbc,$listing_sql);
  $row_listings = mysqli_fetch_all($select_listings);
  shuffle($row_listings);
  $jason_str = json_encode($row_listings);
  return $jason_str;      
}

function edit_business_keywords($search_display){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $get_info = @mysqli_query($dbc,"CALL edit_business_keywords($search_display)");
  $row_info = mysqli_fetch_assoc($get_info);
  return $row_info;
}

function update_adline_keyword($insert_array){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $call_str = implode(',', $insert_array);
  $insert_result = @mysqli_query($dbc,"CALL update_adline_keyword($call_str)");
  return $insert_result;
}

function get_help_wanted($list_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $get_info = @mysqli_query($dbc,"CALL get_help_wanted($list_id)");
  $row_info = mysqli_fetch_assoc($get_info);
  return $row_info;
}

function update_help_wanted($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_help_wanted($call_str)");
    return $insert_result;
}

function insert_help_wanted($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_help_wanted($call_str)");
    return $insert_result;
}

function get_seasons(){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_seasons()");
    return mysqli_fetch_assoc($sql_result);    
}


function get_on_sale($list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_on_sale($list_id)");
    $result_array = mysqli_fetch_all($sql_result);
    array_walk($result_array, function($value, $idx) use (&$on_sale_array){
        $on_sale_array[] =  $value[0];
    });
    return $on_sale_array; 
}

function get_seasonal($list_id, $season_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_seasonal($list_id, $season_id)");
    $result_array = mysqli_fetch_all($sql_result);
    array_walk($result_array, function($value, $idx) use (&$season_array){
        $season_array[] =  $value[0];
    });
    return $season_array; 
}



function update_product_season($product_id, $season_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array[0] = @mysqli_query($dbc,"CALL update_product_season($product_id, $season_id)");
    return json_encode($return_array);
}


function get_current_season_Id(){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_current_season_Id()");
    $result_array = mysqli_fetch_assoc($sql_result);
    return $result_array['id']; 
}


function get_company_season($season_id){
    $season_company_array = Array();
    $island_index_array = Array();
    $return_array = Array();
    $index = 0;
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_company_season($season_id)");
    $result_array = mysqli_fetch_all($sql_result);
    array_walk($result_array, function($value, $idx) use (&$season_company_array){
        $season_company_array[$value[0]] =  Array( Array(),Array(),Array());
    });

        array_walk($result_array, function($value, $idx) use (&$season_company_array,&$island_index_array){
            $location_array =  explode(':',$value[2]);
            array_push($season_company_array[$value[0]][0],$location_array[0] );
            array_push($season_company_array[$value[0]][1],$value[1] );
            array_push($season_company_array[$value[0]][2],Array($location_array[0],$value[1]) );
        });

        array_walk($season_company_array, function($value, $idx) use (&$return_array, &$index,&$island_index_array){
            $product_array  = array_unique($value[1]);
            $islands_array = array_unique($value[0]);
            $product_cnt = count($product_array);
            $product_ids = implode(',',$product_array);
            $island_ids = implode(',',$islands_array);
            $island_pid_cnt = Array();
            
            array_walk($islands_array, function($value, $idx) use (&$island_pid_cnt){
               $island_pid_cnt[$value] = Array(); 
            });
            
            array_walk($value[2], function($value, $idx) use (&$island_pid_cnt){
               array_push($island_pid_cnt[$value[0]], $value[1]);
            });
            
            array_walk($island_pid_cnt, function($value, $idx) use (&$island_index_array){
                $pid_unique = array_unique($value);
                $pid_cnt = count($pid_unique);
                $pid_unique_str = implode(',',$pid_unique);
                array_push($island_index_array, Array($idx, $pid_unique_str, $pid_cnt));
            });
            
            array_unshift($island_index_array,Array('#0#',$product_ids,$product_cnt));
            array_push($return_array, Array($idx,$product_cnt,$product_ids,$island_ids, $index,$island_index_array));

            $index = $index + 1;
            $island_index_array = Array();
        });
        return json_encode($return_array);
}

function get_sales_events_display(){
    $season_company_array = Array();
    $island_index_array = Array();
    $return_array = Array();
    $index = 0;
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_sales_events_active()");
    $result_array = mysqli_fetch_all($sql_result);
    array_walk($result_array, function($value, $idx) use (&$season_company_array){
        $season_company_array[$value[0]] =  Array( Array(),Array(),Array());
    });

        array_walk($result_array, function($value, $idx) use (&$season_company_array,&$island_index_array){
            $location_array =  explode(':',$value[2]);
            array_push($season_company_array[$value[0]][0],$location_array[0] );
            array_push($season_company_array[$value[0]][1],$value[1] );
            array_push($season_company_array[$value[0]][2],Array($location_array[0],$value[1]) );
        });

            array_walk($season_company_array, function($value, $idx) use (&$return_array, &$index,&$island_index_array){
                $product_array  = array_unique($value[1]);
                $islands_array = array_unique($value[0]);
                $product_cnt = count($product_array);
                $product_ids = implode(',',$product_array);
                $island_ids = implode(',',$islands_array);
                $island_pid_cnt = Array();

                array_walk($islands_array, function($value, $idx) use (&$island_pid_cnt){
                    $island_pid_cnt[$value] = Array();
                });

                    array_walk($value[2], function($value, $idx) use (&$island_pid_cnt){
                        array_push($island_pid_cnt[$value[0]], $value[1]);
                    });

                        array_walk($island_pid_cnt, function($value, $idx) use (&$island_index_array){
                            $pid_unique = array_unique($value);
                            $pid_cnt = count($pid_unique);
                            $pid_unique_str = implode(',',$pid_unique);
                            array_push($island_index_array, Array($idx, $pid_unique_str, $pid_cnt));
                        });

                            array_unshift($island_index_array,Array('#0#',$product_ids,$product_cnt));
                            array_push($return_array, Array($idx,$product_cnt,$product_ids,$island_ids, $index,$island_index_array));

                            $index = $index + 1;
                            $island_index_array = Array();
            });
            return json_encode($return_array);
}

function get_sales_display(){
  $season_company_array = Array();
  $island_index_array = Array();
  $return_array = Array();
  $index = 0;
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $sql_result = @mysqli_query($dbc,"CALL get_slaes_by_company()");
  $result_array = mysqli_fetch_all($sql_result);
  shuffle($result_array);
  array_walk($result_array, function($value, $idx) use (&$season_company_array){
      $season_company_array[$value[0]] =  Array( Array(),Array(),Array(),Array());
  });

  array_walk($result_array, function($value, $idx) use (&$season_company_array,&$island_index_array){
      $location_array =  explode(':',$value[2]);
      array_push($season_company_array[$value[0]][0],$location_array[0] );
      array_push($season_company_array[$value[0]][1],$value[1] );
      array_push($season_company_array[$value[0]][2],Array($location_array[0],$value[1],$value[3]));
      array_push($season_company_array[$value[0]][3],$value[3]);
  });

    array_walk($season_company_array, function($value, $idx) use (&$return_array, &$index,&$island_index_array){
        $product_array  = array_unique($value[1]);
        $product_array_x  = array_unique($value[3]);
        $islands_array = array_unique($value[0]);
        $product_cnt = count($product_array);
        $product_ids = implode(',',$product_array);
        $product_ids_x = implode(',',$product_array_x);
        $island_ids = implode(',',$islands_array);
        $island_pid_cnt = Array();

        array_walk($islands_array, function($value, $idx) use (&$island_pid_cnt){
            $island_pid_cnt[$value] = Array(Array(),Array());
        });

            array_walk($value[2], function($value, $idx) use (&$island_pid_cnt){
                array_push($island_pid_cnt[$value[0]][0],$value[1]);
                array_push($island_pid_cnt[$value[0]][1],$value[2]);
            });

                array_walk($island_pid_cnt, function($value, $idx) use (&$island_index_array){
                    $pid_unique = array_unique($value[0]);
                    $pid_unique_x = array_unique($value[1]);
                    $pid_cnt = count($pid_unique);
                    $pid_unique_str = implode(',',$pid_unique);
                    $pid_unique_str_x = implode(',',$pid_unique_x);
                    array_push($island_index_array, Array($idx, $pid_unique_str, $pid_cnt,$pid_unique_str_x));
                });

                    array_unshift($island_index_array,Array('#0#',$product_ids,$product_cnt,$product_ids_x));
                    array_push($return_array, Array($idx,$product_cnt,$product_ids,$island_ids, $index,$island_index_array));

                    $index = $index + 1;
                    $island_index_array = Array();
    });
  return json_encode($return_array);
}

function insert_resume($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_resume($call_str)");
    return $insert_result;
}

function update_resume($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_resume($call_str)");
    return $insert_result;
}

function get_resume($member_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_resume($member_id)");
    $result_array = mysqli_fetch_assoc($sql_result);
    return $result_array;
}


function get_help_wanted_active($returnArray, $member_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_help_wanted_active($member_id)");
    $result_array = mysqli_fetch_all($sql_result);
    $returnArray[0] = $result_array;
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result2 = @mysqli_query($dbc,"CALL get_resume_id($member_id)");
    $result_array2 = mysqli_fetch_all($sql_result2);
    $returnArray[1] = $result_array2[0][0];
    return json_encode($returnArray);
}

function insert_help_wanted_apply($job_id,$resume_id,$memberId,$list_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array[0] = @mysqli_query($dbc,"CALL insert_help_wanted_apply($job_id,$resume_id,$memberId,$list_id)");
    return json_encode($return_array);
}

function delete_help_wanted_appy($job_id,$memberId){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array[0] = @mysqli_query($dbc,"CALL delete_help_wanted_appy($job_id,$memberId)");
    return json_encode($return_array);  
}

function delete_help_wanted_company($job_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $return_array[0] = @mysqli_query($dbc,"CALL delete_help_wanted_company($job_id)");
    return json_encode($return_array);  
}

function getApplyResume($resume_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL getApplyResume($resume_id)");
    $result = mysqli_fetch_assoc($sql_result);
    $result = str_replace('contenteditable', '', $result['resume']);
    return $result; 
}

function get_sales_events($listId){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_sales_events($listId)");
    $result = mysqli_fetch_assoc($sql_result);
    return $result;   
}

function get_member_info($member_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_member_info($member_id)");
    $result = mysqli_fetch_assoc($sql_result);
    return $result;   
}

function get_member_classified($member_id,$control_number){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_member_classified($member_id,$control_number)");
    $result = mysqli_fetch_assoc($sql_result);
    return $result;   
}

function get_member_forrent($member_id,$control_number){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_member_forrent($member_id,$control_number)");
    $result = mysqli_fetch_assoc($sql_result);
    return $result;   
}

function reset_password($welcome_password, $uid, $puid){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL reset_password($welcome_password, $uid, $puid)");
    return $sql_result;   
}

function get_card_info($card_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $sql_result = @mysqli_query($dbc,"CALL get_card_info($card_id)");
  $result = mysqli_fetch_assoc($sql_result);
  //card_type,card_ending,name_on_card
  return $result;   
}

function get_single_billing_listing($list_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $sql_result = @mysqli_query($dbc,"CALL get_single_billing_listing($list_id)");
  $result = mysqli_fetch_assoc($sql_result);
  return array($result['list_bill_info']);   
}

function get_multi_billing_listing($member_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");
  $sql_result = @mysqli_query($dbc,"CALL get_multi_billing_listing($member_id)");
  $result = mysqli_fetch_all($sql_result);
  return $result;   
}

function get_email_password($email){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_email_password($email)");
    $result = mysqli_fetch_assoc($sql_result);
    return $result['password'];   
}

function get_email_job_info($job_id, $email){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $sql_result = @mysqli_query($dbc,"CALL get_email_job_info($job_id)");
    $result = mysqli_fetch_assoc($sql_result);

    $to      = $email;
    $subject = "Job Application for {$result['job_title']}";
    $message =  "Please contact {$result['search_display']} concerning your application for {$result['job_title']}.\r\n";
    $message .= "Phone:{$result['phone']}  email:{$result['email']} ";
    $headers = "From:the242Support" . "\r\n" ."Reply-To: {$result['email']}" . "\r\n"; 

    return mail($to, $subject, $message, $headers);
}  

function insert_sales_events($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_sales_events($call_str)");
    return $insert_result;
}

function update_sales_events($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_sales_events($call_str)");
    return $insert_result;
}

function getDisplaySalesEventsList($list_ids){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");

  $html_out = '';
  $sql_select = '';
  $sql_select  .= 'SELECT list_id, search_display, title, description, image, DATE_FORMAT(end_date, "%b %D, %Y") AS enddate, map, full_address '; 
  $sql_select  .= 'FROM the242.sales_events ';
  $sql_select  .= "WHERE list_id IN($list_ids) ";
  $sql_select  .= 'ORDER BY end_date';   


  $sql_result =  mysqli_query($dbc,$sql_select);
  while($row_wl = mysqli_fetch_assoc($sql_result)){
    //list_id,search_display, title, description, image, enddate, map
    extract($row_wl);
    $html_out .= '<div class="sales-events-details"> ';  
    $html_out .= '<div class="col-md-4 ">';
    $html_out .= "<img class='img-responsive center-block se-image' src='$image' alt='Image'>";
    $html_out .= '</div>';
    $html_out .= '<div class="col-md-8">';
    $html_out .= '<div class="panel panel-default">';
    $html_out .= '<div class="panel-heading sales-events">';
    $html_out .= '<h4>' . htmlentities($title) . "<small class='pull-right'>$enddate</small></h4>";
    $html_out .= '</div>';
    $html_out .= '<div class="panel-body se-discription">';
    $html_out .= '<p>' . htmlentities($description) . '</p>';
    $html_out .= '</div>';
    $html_out .= '<div class="panel-footer se-footer">';
    $html_out .= '<p>';
    $html_out .= "<a href='$map' class='btn btn-warning btn-sm map pull-right' tabindex='-1' data-search_display='" . htmlentities($search_display) . "' data-element='a_salesevent_map' ><span class='glyphicon glyphicon-map-marker text-danger'></span></a>";
    $html_out .= "<a href='$list_id' class='' data-element='a_list_id'>" . htmlentities($full_address) . '</a>';
    $html_out .= '</p>';
    $html_out .= '</div>';
    $html_out .= '</div>';
    $html_out .= '</div>';
    $html_out .= '</div>';
  }
  return $html_out;
}

function getDisplayClassifiedDetails($classified_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");

  $sql_result =  @mysqli_query($dbc,"CALL get_Display_Classified_Details($classified_id)");
  while($row_wl = mysqli_fetch_assoc($sql_result)){
    //adline,description,pricing,phone,email,image_1,image_2,image_3,image_4
    extract($row_wl);
    $image_1 = strlen($image_1) > 0 ? $image_1 : 'images/classified/placeholder.png';
    $image_2 = strlen($image_2) > 0 ? $image_2 : 'images/classified/placeholder.png';
    $image_3 = strlen($image_3) > 0 ? $image_3 : 'images/classified/placeholder.png';
    $image_4 = strlen($image_4) > 0 ? $image_4 : 'images/classified/placeholder.png';
    $html_out .= '<div class="classified-details"> ';  
    $html_out .= '<div class="col-md-4 ">';
    $html_out .= "<div id='carousel-class-dispaly$classified_id' class='carousel slide' data-ride='carousel' data-interval>";
    $html_out .=  '<div class="carousel-inner" role="listbox">';
    $html_out .=      '<div class="item active">';
    $html_out .=        "<img class='center-block img-responsive' src='$image_1' alt='Photo 1'>";
    $html_out .=      '</div>';
    $html_out .=      '<div class="item">';
    $html_out .=        "<img class='center-block img-responsive' src='$image_2' alt='Photo 2'>";
    $html_out .=      '</div>';
    $html_out .=      '<div class="item">';
    $html_out .=        "<img class='center-block img-responsive' src='$image_3' alt='Photo 3'>";
    $html_out .=      '</div>'; 
    $html_out .=      '<div class="item">';
    $html_out .=        "<img class='center-block img-responsive' src='$image_4' alt='Photo 4'>";
    $html_out .=      '</div>';       
    $html_out .=    '</div>';
    $html_out .=    "<a class='left carousel-control' href='#carousel-class-dispaly$classified_id' role='button' data-slide='prev'>";
    $html_out .=      '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
    $html_out .=    '</a>';
    $html_out .=    "<a class='right carousel-control' href='#carousel-class-dispaly$classified_id' role='button' data-slide='next'>";
    $html_out .=      '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
    $html_out .=    '</a>';
    $html_out .=  '</div>';
    $html_out .= '</div>'; 
    $html_out .= '</div>';
    $html_out .= '<div class="col-md-8">';
    $html_out .= '<div class="panel panel-default">';
    $html_out .= '<div class="panel-heading classified">';
    $html_out .= '<h4>' . htmlentities($adline) . '</h4>';
    $html_out .= '<p>' . htmlentities($pricing) . '</p>';
    $html_out .= '</div>';
    $html_out .= '<div class="panel-body classified-discription">';
    $html_out .= '<p>' . htmlentities($description) . '</p>';
    $html_out .= '</div>';
    $html_out .= '<div class="panel-footer classified-footer">';
    $html_out .= '<p>';
    $html_out .= "<a href'tel:$phone' class='btn btn-primary btn-xs visible-xs-inline'><span class='glyphicon glyphicon-earphone'></span></a>";
    $html_out .= "<span class='hidden-xs'><b>Phone:</b> $phone </span><br/>";
    $html_out .= "<span><b>email:</b> $email </span><br/>";
    $html_out .= '</p>';
    $html_out .= '</div>';
    $html_out .= '</div>';
    $html_out .= '</div>';
    $html_out .= '</div>';
  }
  return $html_out;
}

function getDisplayForRentDetails($for_rent_id){
  $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
  mysqli_select_db ($dbc, "the242");

  $sql_result =  @mysqli_query($dbc,"CALL get_Display_ForRent_Details($for_rent_id)");
  while($row_wl = mysqli_fetch_assoc($sql_result)){
    //adline,description,address,map,pricing,phone,email,image_1,image_2,image_3,image_4
    extract($row_wl);
    $image_1 = strlen($image_1) > 0 ? $image_1 : 'images/classified/placeholder.png';
    $image_2 = strlen($image_2) > 0 ? $image_2 : 'images/classified/placeholder.png';
    $image_3 = strlen($image_3) > 0 ? $image_3 : 'images/classified/placeholder.png';
    $image_4 = strlen($image_4) > 0 ? $image_4 : 'images/classified/placeholder.png';
    $html_out .= '<div class="forrent-details"> ';  
    $html_out .= '<div class="col-md-4 ">';
    $html_out .= "<div id='carousel-class-dispaly$for_rent_id' class='carousel slide' data-ride='carousel' data-interval>";
    $html_out .=  '<div class="carousel-inner" role="listbox">';
    $html_out .=      '<div class="item active">';
    $html_out .=        "<img class='center-block img-responsive' src='$image_1' alt='Photo 1'>";
    $html_out .=      '</div>';
    $html_out .=      '<div class="item">';
    $html_out .=        "<img class='center-block img-responsive' src='$image_2' alt='Photo 2'>";
    $html_out .=      '</div>';
    $html_out .=      '<div class="item">';
    $html_out .=        "<img class='center-block img-responsive' src='$image_3' alt='Photo 3'>";
    $html_out .=      '</div>'; 
    $html_out .=      '<div class="item">';
    $html_out .=        "<img class='center-block img-responsive' src='$image_4' alt='Photo 4'>";
    $html_out .=      '</div>';       
    $html_out .=    '</div>';
    $html_out .=    "<a class='left carousel-control' href='#carousel-class-dispaly$for_rent_id' role='button' data-slide='prev'>";
    $html_out .=      '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
    $html_out .=    '</a>';
    $html_out .=    "<a class='right carousel-control' href='#carousel-class-dispaly$for_rent_id' role='button' data-slide='next'>";
    $html_out .=      '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
    $html_out .=    '</a>';
    $html_out .=  '</div>';
    $html_out .= '</div>'; 
    $html_out .= '</div>';
    $html_out .= '<div class="col-md-8">';
    $html_out .= '<div class="panel panel-default">';
    $html_out .= '<div class="panel-heading forrent">';
    $html_out .= '<h4>' . htmlentities($adline) . '</h4>';
    $html_out .= '<p class="address">' . htmlentities($address) . '</p>';
    $html_out .= '<p class="price">' . htmlentities($pricing) . '</p>';
    $html_out .= '</div>';
    $html_out .= '<div class="panel-body forrent-discription">';
    $html_out .= '<p>' . htmlentities($description) . '</p>';
    $html_out .= '</div>';
    $html_out .= '<div class="panel-footer forrent-footer">';
    $html_out .= '<p>';
    $html_out .= "<a href'tel:$phone' class='btn btn-primary btn-xs visible-xs-inline'><span class='glyphicon glyphicon-earphone'></span></a>";
    $html_out .= "<span class='hidden-xs'><b>Phone:</b> $phone </span><br/>";
    $html_out .= "<span><b>email:</b> $email </span><br/>";
    $html_out .= "<a href='$map' class='btn btn-warning btn-sm map' tabindex='-1' data-adline='" . htmlentities($adline) ."' data-storefront='$image_1' data-phone='$phone' data-element='forrent_map' ><span class='glyphicon glyphicon-map-marker text-danger'></span></a>";
    $html_out .= '</p>';
    $html_out .= '</div>';
    $html_out .= '</div>';
    $html_out .= '</div>';
    $html_out .= '</div>';
  }
  return $html_out;
}

function get_island_id($island_name){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $get_info = @mysqli_query($dbc,"CALL get_island_id($island_name)");
    $row_info = mysqli_fetch_assoc($get_info);
    return $row_info['island_id'];
}

function insert_classified($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_classified($call_str)");
    return $insert_result;
}

function update_classified($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_classified($call_str)");
    return $insert_result;
}

function insert_for_rent($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_for_rent($call_str)");
    return $insert_result;
}

function update_for_rent($insert_array){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");
    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL update_for_rent($call_str)");
    return $insert_result;
}

function insertDeleteRequest($member_id){
    $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
    mysqli_select_db ($dbc, "the242");

    $deceased = isset($_POST['deceased'])?'Y':'N';
    $offensive = isset($_POST['offensive'])?'Y':'N';
    $replaced = isset($_POST['replaced'])?'Y':'N';
    $duplicate = isset($_POST['duplicate'])?'Y':'N';
    $outofbusiness = isset($_POST['outofbusiness'])?'Y':'N';
    $changed = isset($_POST['changed'])?'Y':'N';
    $other = isset($_POST['other'])?'Y':'N';
    $explanation = $_POST['explanation'];
    $list_id = $_POST['list_id'];

    $insert_array = [];
    $insert_array[] = "'" . $list_id . "'";//list_id
    $insert_array[] = "'" . $member_id . "'";//member_id
    $insert_array[] = "'" . $deceased . "'";//deceased
    $insert_array[] = "'" . $offensive . "'";//offensive
    $insert_array[] = "'" . $replaced . "'";//replaced
    $insert_array[] = "'" . $duplicate . "'";//duplicate
    $insert_array[] = "'" . $outofbusiness . "'";//out_of_business
    $insert_array[] = "'" . $changed . "'";//changed
    $insert_array[] = "'" . $other . "'";//other
    $insert_array[] = "'" . mysqli_real_escape_string($dbc,trim($explanation)) . "'"; //note

    $call_str = implode(',', $insert_array);
    $insert_result = @mysqli_query($dbc,"CALL insert_delete_request($call_str)");
    return json_encode($insert_result);
}

function product_sales_search($product_ids){
    $product_company_array = Array();
    $locations_array = Array();
    $return_array = Array();
    if(!empty($product_ids)){
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
        mysqli_select_db ($dbc, "the242");
        $query_str = '';
        $query_str = "SELECT products_id,list_name, description,products.product_name, price, sale_enabled, sale_price, date_format(sale_end_date,'%a %b %D, %Y') AS sale_end_date, in_stock, image, on_line_purchase, website, listing_products.location
        " ;
        $query_str .= 'FROM the242.products INNER JOIN listing_products ON products.products_id = listing_products.product_id ';
        $query_str .= "WHERE listing_products.product_id IN($product_ids)";
        $select = @mysqli_query($dbc,$query_str);
        $result_array = mysqli_fetch_all($select);

        array_walk($result_array, function($value, $idx) use (&$product_company_array, &$locations_array){
            $product_company_array[$value[0]] =   $value;
            $locations_array[$value[0]] = Array();
        });

            array_walk($result_array, function($value, $idx) use (&$product_company_array, &$locations_array){
                array_push($locations_array[$value[0]], $value[12]);
            });

                array_walk($product_company_array, function($value, $idx) use (&$return_array, $locations_array){
                    array_push($return_array,Array(
                    $value[0],
                    $value[1],
                    $value[2],
                    $value[3],
                    $value[4],
                    $value[5],
                    $value[6],
                    $value[7],
                    $value[8],
                    $value[9],
                    $value[10],
                    $value[11],
                    $locations_array[$idx]) );
                });
                shuffle($return_array);
                $jason_str = json_encode($return_array);
                return $jason_str;
    }
}

function getNewArrivals($list_id){
    $product_company_array = Array();
    $locations_array = Array();
    $return_array = Array();
    if(!empty($list_id)){
        $dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('Warning Service curently unavailable.');
        mysqli_select_db ($dbc, "the242");
        $select = @mysqli_query($dbc,"CALL getNewArrivals($list_id)");
        $result_array = mysqli_fetch_all($select);

        array_walk($result_array, function($value, $idx) use (&$product_company_array, &$locations_array){
            $product_company_array[$value[0]] =   $value;
            $locations_array[$value[0]] = Array();
        });

            array_walk($result_array, function($value, $idx) use (&$product_company_array, &$locations_array){
                array_push($locations_array[$value[0]], $value[12]);
            });

                array_walk($product_company_array, function($value, $idx) use (&$return_array, $locations_array){
                    array_push($return_array,Array(
                    $value[0],
                    $value[1],
                    $value[2],
                    $value[3],
                    $value[4],
                    $value[5],
                    $value[6],
                    $value[7],
                    $value[8],
                    $value[9],
                    $value[10],
                    $value[11],
                    $locations_array[$idx]) );
                });
                shuffle($return_array);
                $jason_str = json_encode($return_array);
                return $jason_str;
    }
}