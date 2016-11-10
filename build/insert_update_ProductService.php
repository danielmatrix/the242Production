<?php
require_once('formValidateFunctions.php');
session_start();

function insert_update_product_service($dbc){
  $product_catagory_array = get_product_categories();
  $product_catagory_html = '';

  for($i = 0, $len = count($product_catagory_array); $i < $len; $i++){
      $product_catagory_html .= '<li><a data-element="aProductCatagorySelect" href="' . $product_catagory_array[$i][0] . '">' . $product_catagory_array[$i][1] . "</a></li>"; 
  }

  $service_catagory_array = get_service_categories();
  $service_catagory_html = '';

  for($i = 0, $len = count($service_catagory_array); $i < $len; $i++){
      $service_catagory_html .= '<li><a data-element="aServiceCatagorySelect" href="' . $service_catagory_array[$i][0] . '">' . $service_catagory_array[$i][1] . "</a></li>"; 
  } 

  $formProductService = <<<EOT
    <h5 class="well well-sm col-sm-offset-2 col-sm-10"><span class="text-primary">Products &amp; Services</span> <a id="calcelProductService" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='cancelProductService'><span class="text-muted"><small>Cancel</small><span></a></h5>

    <form id="productService" class="form-horizontal" enctype="multipart/form-data" method="post" name="productService" data-element="productService" data-status="add" novalidate>

      <div class="form-group form-group-sm">
        <label for="productServiceName" class="col-sm-2 control-label">Name</label>
        <div class="col-sm-10">
          <input value="" type="text" class="form-control input-sm" id="productServiceName" name="productServiceName" placeholder="Product or Service Name" data-validateMethod="productName" data-label="productServiceName" data-errorClass="text-danger" data-required="1" data-form="productService">
        </div>
      </div>

      <div class="form-group form-group-sm">
        <label for="productServiceInfo" class="col-sm-2 control-label">Description</label>
        <div class="col-sm-10">
          <textarea id="productServiceInfo" name="productServiceInfo" class="form-control" rows="10" data-required="0"></textarea>
        </div>
      </div> 



      <div class="form-group form-group-sm">
        <label for="category" class="col-sm-2 control-label">Category</label>
        <div class="col-sm-10">
          <div class="input-group input-group-sm">
            <div class="input-group-btn">
              <button tabindex='-1' type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Products <span class="caret"></span></button>
              <ul id="ul_product_catagory" class="dropdown-menu" role="menu">
                $product_catagory_html
              </ul>
            </div><!-- /btn-group -->
            <input value="" type="text" class="form-control input-sm" id="category" name="category" placeholder="Category" data-validateMethod="productName" data-label="category" data-errorClass="text-danger" data-required="1" data-form="productService">
            <div class="input-group-btn">
              <button tabindex='-1' type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Services <span class="caret"></span></button>
              <ul id="ul_service_catagory" class="dropdown-menu" role="menu">
                $service_catagory_html
              </ul>
            </div><!-- /btn-group -->
          </div>
        </div>
      </div>   


      <div class="form-group form-group-sm">
        <label for="subcategory" class="col-sm-2 control-label">Sub</label>
        <div class="col-sm-10">
          <div class="input-group input-group-sm">
            <div class="input-group-btn">
              <button tabindex='-1' type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Products <span class="caret"></span></button>
              <ul id="ul_product_subcatagory" class="dropdown-menu" role="menu">

              </ul>
            </div><!-- /btn-group -->
            <input value="" type="text" class="form-control input-sm" id="subcategory" name="subcategory" placeholder="Sub Category" data-validateMethod="productName" data-label="subcategory" data-errorClass="text-danger" data-required="1" data-form="productService">
            <div class="input-group-btn">
              <button tabindex='-1' type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Services <span class="caret"></span></button>
              <ul id="ul_service_subcatagory" class="dropdown-menu" role="menu">

              </ul>
            </div><!-- /btn-group -->            
          </div>
        </div>
      </div>
      <div class="form-group form-group-sm">
        <label for="keywords" class="col-sm-2 control-label">Keywords</label>
        <div class="col-sm-10">
          <textarea id="keywords" name="keywords" class="form-control" rows="10" data-required="0"></textarea>
        </div>
      </div>                      
    
     <div id="previous_photo">
       
     </div> 

      <div class="form-group form-group-sm">
        <label for="productPhoto" class="col-sm-2 control-label">Photo</label>
        <div class="col-sm-10">
          <input type="file" class="input-sm" id="productPhoto" name="productPhoto" data-required="0" data-previous_photo="" data-element="btnProductPhoto">
          <p class="help-block">Please select an image file of type JPEG, PNG, or GIF, being 10kb or smaller (max width: 200px max lenght: 300px)</p>
        </div>
      </div> 

      <div class="form-group form-group-sm">
        <label for="productServicePrice" class="col-sm-2 control-label">Price</label>
        <div class="col-sm-10">
          <input value="" type="text" class="form-control input-sm" id="productServicePrice" name="productServicePrice" placeholder="0.00" data-validateMethod="price" data-label="productServicePrice" data-errorClass="text-danger" data-required="1" data-form="productService">
        <hr class="hr_product_service">
        </div>
      </div> 
      
      <div class="form-group form-group-sm">
        <label for="discountEnabled" class="col-sm-2 control-label">On Sale</label>
        <div class="col-sm-10">
          <input value="Y" type="checkbox" id="discountEnabled" name="discountEnabled" data-validateMethod="" data-label="discountEnabled" data-errorClass="text-danger" data-required="0" data-form="productService">
        </div>
      </div>          

      <div class="form-group form-group-sm">
        <label for="discountPrice" class="col-sm-2 control-label">Sale Price</label>
        <div class="col-sm-10">
          <input 
           value="" type="text" class="form-control input-sm" id="discountPrice" name="discountPrice" placeholder="0.00" data-validateMethod="price" data-label="discountPrice" data-errorClass="text-danger" data-required="0" data-form="productService">
        </div>
      </div> 

      <div class="form-group form-group-sm">
        <label for="discountEndDate" class="col-sm-2 control-label">Sale End</label>
        <div class="col-sm-10">
          <input
            id="discountEndDate" type="text" class="form-control input-sm" name="discountEndDate" placeholder="mm/dd/yyyy" data-required="0" data-validateMethod="birthday"  data-label="discountEndDate" data-errorClass="text-danger" data-form="productService">
        </div>
      </div> 

      <div class="form-group form-group-sm">
        <label for="season_price" class="col-sm-2 control-label">Season</label>
        <div class="col-sm-10">
          <input
            id="season_price" type="text" class="form-control input-sm" name="season_price" placeholder="Season Special" data-required="0" data-validateMethod=""  data-label="season_price" data-errorClass="text-danger" data-form="productService">
          <hr class="hr_product_service">
        </div>
      </div>           

      <div class="form-group form-group-sm">
        <label for="inStock" class="col-sm-2 control-label">In Stock</label>
        <div class="col-sm-10">
          <input value="Y" type="checkbox" class="" id="inStock" name="inStock" data-validateMethod="" data-label="inStock" data-errorClass="text-danger" data-required="0" data-form="productService">
        </div>
      </div> 

      <div class="form-group form-group-sm">
        <label for="onlinepurchase" class="col-sm-2 control-label">Online</label>
        <div class="col-sm-10">
          <input value="Y" type="checkbox" class="" id="onlinepurchase" name="onlinepurchase" data-validateMethod="" data-label="onlinepurchase" data-errorClass="text-danger" data-required="0" data-form="productService">
          <p class="help-block">This item available for purchase online at our website</p>            
        </div>
      </div>       

      <div class="form-group form-group-sm">
        <label for="addToAll" class="col-sm-2 control-label">Add to all</label>
        <div class="col-sm-10">
          <input value="Y" type="checkbox" class="" id="addToAll" name="addToAll" data-validateMethod="" data-label="addToAll" data-errorClass="text-danger" data-required="0" data-form="productService">
        </div>
      </div> 

      <div class="form-group form-group-sm">
        <label for="newArrival" class="col-sm-2 control-label">New Arrival</label>
        <div class="col-sm-10">
          <input value="Y" type="checkbox" class="" id="newarrival" name="newarrival" data-validateMethod="" data-label="newarrival" data-errorClass="text-danger" data-required="0" data-form="productService">
        </div>
      </div>              

      <div class="form-group form-group-sm">
        <div class="col-sm-offset-2 col-sm-10">
          <button id="btnProductService" type="submit"  class="btn btn-primary btn-xs" data-season_id="0" data-element="btnProductService" data-form="productService" data-website="{$_POST['website']}"  data-phone="{$_POST['phone']}" data-listid="{$_POST['list_id']}" data-island_id="{$_POST['island_id']}" data-map="{$_POST['map']}" data-search_display="{$_POST['search_display']}" data-product_id="" data-li_id='' data-address="{$_POST['address']}"> Apply</button>
        </div>
      </div>
      <div id="formProductServiceAlert" class="alert alert-danger col-sm-offset-2 col-sm-10" role="alert">There were errors! Please check your entries.</div>
    </form>


EOT;

  $requiredArray = Array(
      'productServiceName' => 'productname',
      'category' => 'productname',
      'subcategory' => 'productname',
      'productServicePrice' => 'price'
  );

  $formStatus = $_POST['formStatus'];
  if($formStatus === 'edit'){
      $listId =  $_POST['listId']; 
      $pre_photo_name = $_POST['previous_photo'];
      $requiredArray = Array(
      'productServiceName' => 'productname',
      'productServicePrice' => 'price'
    );
  }




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
  $fileArray = $_FILES;
  $allToAll = false;

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

  $file_included =  check_file_type_size(10000, $fileArray, $member_id);
  if(strlen($_FILES['productPhoto']['name']) === 0){
      $file_included = false;
  };

  if($file_included){
      $image_fullsize =  'images/products/img_' . $member_id . '_' . $_FILES['productPhoto']['name'];
      $image_path = '../' . $image_fullsize;
      $file_moved = move_uploaded_file($fileArray['productPhoto']['tmp_name'],$image_path);
      list($width, $height) = getimagesize($image_path);
      $percent = (40/$height);
      $new_width = intval($width * $percent);
      $new_height = intval($height * $percent);
      $image_th =  'images/products/img_thn_' . $member_id . '_' .$_FILES[ 'productPhoto' ]['name' ];
      $image_th_path = '../' . $image_th;
      // Resample
      $image_p = imagecreatetruecolor($new_width, $new_height);
      $image = imagecreatefromjpeg($image_path);
      imagecopyresampled($image_p, $image, 0, 0, 0, 0,$new_width, $new_height, $width, $height);
      imagejpeg ($image_p,$image_th_path);
  }
  else{
      if(strlen($pre_photo_name) > 0){
          $image_fullsize =  $pre_photo_name;
          $relace_str1 = 'images/products/img_' . $member_id . '_';
          $image_th = str_replace($relace_str1,'' , $image_fullsize); 
          $image_th = 'images/products/img_thn_' . $member_id . '_' .  $image_th;
      }
      else{
          $image_fullsize = '';
          $image_th = '';
      }
  }
            
  //process keywords
  $word_file_str = $formElementArray['productServiceName'][0] . ' ' . $formElementArray['category'][0] . '  ' . $formElementArray['subcategory'][0] . ' ' . $formElementArray['keywords'][0] . ' ' . $formElementArray['address'][0] ;
  $word_file_str = preg_replace("/\s+|[^a-zA-Z0-9]/", " " , $word_file_str);
  $word_file_str = strtolower($word_file_str);
  $word_array = explode(' ', $word_file_str);
  array_walk($word_array, function($value, $idx)use (&$word_array, $dbc){
      $word_array[$idx] = mysqli_real_escape_string($dbc, trim($value));
      if(strlen($value) < 2){
         unset($word_array[$idx]);
         prev($word_array);
         //$word_array[$idx] = null;
     } 
  });
  $word_array = array_unique($word_array);
  $keyword_str = implode(' ',$word_array);
  $formElementArray['keywords'][0] = $keyword_str;            
                        
  $productServiceName =  mysqli_real_escape_string($dbc,$formElementArray['productServiceName'][0]); 
            
            
  if(isset($formElementArray['discountEnabled'][0]) && $formElementArray['discountEnabled'][0] === 'Y'){
    $valid = false;
    $valid = preg_match(" /^\d+\.\d\d$/", $formElementArray[discountPrice][0]) === 1;
    $valid = $valid && floatval($formElementArray[discountPrice][0]) > 0;
    
    $dateArray = explode('/', $formElementArray['discountEndDate'][0]); 
    $valid = $valid && checkdate(intval($dateArray[0]), intval($dateArray[1]), intval($dateArray[2]));

    if($valid){
      $discountEndDate = $formElementArray['discountEndDate'][0];
      $now = date('Y-m-d',time());
      $max_sale_date = date('Y-m-d',strtotime($now . "+10 days"));
      $datetime1 = date_create($now);
      $datetime2 = date_create($discountEndDate);
      $interval = date_diff($datetime1, $datetime2);
      $days = $interval->days;
      $data_array = explode('/',$formElementArray['discountEndDate'][0]);
      $date_str = $data_array[2] . '-' . $data_array[0] . '-' . $data_array[1];
      $formElementArray['discountEndDate'][0] = $date_str;
      $formElementArray['discountEndDate'][0] = $days <= 10 ? $formElementArray['discountEndDate'][0] : $max_sale_date;
    }
    else{
    $formElementArray['discountPrice'][0] = '0.00';
    $formElementArray['discountEndDate'][0] = '1900-01-01';
    $formElementArray['discountEnabled'][0] = 'N';
    }    
  }  
  else{
    $formElementArray['discountPrice'][0] = '0.00';
    $formElementArray['discountEndDate'][0] = '1900-01-01';
    $formElementArray['discountEnabled'][0] = 'N';
  }

  if(strlen($formElementArray['map'][0]) > 0 ){
    $map  = $formElementArray['map'][0];
  }
  else{
    $map = '';
  }
            

  $insert_product_service_array = [];
  $insert_product_service_array['member_id'] = "'" . $member_id . "'";// `member_id`
  $insert_product_service_array['list_name'] = "'" . $formElementArray['search_display'][0] . "'";// `list_name`
  $insert_product_service_array['product_name'] = "'" . $productServiceName . "'";// `product_name`
  $insert_product_service_array['description'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['productServiceInfo'  ][0])  . "'";// `description` 
  $insert_product_service_array['price'] = "'" . $formElementArray['productServicePrice'][0] . "'"; // `price`
  $insert_product_service_array['keywords'] = "'" . $formElementArray['keywords'][0] . "'"; // `keywords` 
  $insert_product_service_array['sale_enabled'] = "'" . $formElementArray['discountEnabled'][0]   . "'";// `sale_enabled` 
  $insert_product_service_array['sale_price'] = "'" . $formElementArray['discountPrice'][0] . "'";// `sale_price`
  $insert_product_service_array['sale_end_date'] = "'" . $formElementArray['discountEndDate'][0] . "'";// `sale_end_date`
  if(isset($formElementArray['inStock'][0]) && $formElementArray['inStock'][0] === 'Y'){
    $insert_product_service_array['in_stock'] = "'" . $formElementArray['inStock'][0] . "'";// `in_stock`    
  }
  else{
    $insert_product_service_array['in_stock'] = "'" . 'N'. "'";// `in_stock`
  }
  $insert_product_service_array['image'] = "'" . $image_fullsize . "'";// `image`
  $insert_product_service_array['thumbnail'] = "'" . $image_th . "'";// `thumbnail`
  $insert_product_service_array['addToAll'] = "'". 'N' . "'";// `addToAll`  
  $insert_product_service_array['category'] = "'" .  ucwords($formElementArray['category'][0]) . "'";// `category`
  $insert_product_service_array['subcategory'] = "'" .  ucwords($formElementArray['subcategory'][0]) . "'";// `subcategory`
  if(isset($formElementArray['onlinepurchase'][0]) && $formElementArray['onlinepurchase'][0] === 'Y'){
    $insert_product_service_array['onlinepurchase'] = "'" . $formElementArray['onlinepurchase'][0] . "'";// `online`    
  }
  else{
    $insert_product_service_array['onlinepurchase'] = "'" . 'N'. "'";// `online`
  }  
  $insert_product_service_array['website'] = "'" .  $formElementArray['website'][0] . "'";// `website`
  $insert_product_service_array['season_price'] = "'" . mysqli_real_escape_string($dbc,$formElementArray['season_price'][0]) . "'";// `season_price`
  $insert_product_service_array['season_id'] = "'" .  $formElementArray['season_id'][0] . "'";// `seasin_id`
  
  if(isset($formElementArray['addToAll'][0]) && $formElementArray['addToAll'][0] === 'Y'){
      $allToAll = true;
      $insert_product_service_array['addToAll'] = "'". 'Y' . "'";
  }

  if(isset($formElementArray['newarrival'][0])){
      $insert_product_service_array['newarrival'] = "'". 'Y' . "'";
  }
  else{
    $insert_product_service_array['newarrival'] = "'". '0' . "'";  
  }  

  if($formValid){
    if($formStatus === 'edit'){
      $product_id = $_POST[ 'product_id'];
      $return_array[0] = $return_array[0] && delete_product($product_id);
      $return_array[0] = $return_array[0] && delete_product_from_listings($product_id);
      if($return_array[0]){
          $formStatus = 'add';
      }
    }//edit

    if($formStatus === 'add'){
      $return_array = array();
      $return_array = insert_product_service($insert_product_service_array,$return_array); 
      $return_array[0] = $return_array[0] &&  insert_productwords($word_array);
      $new_product_id =  $return_array[1];
      $return_array[2] = $member_id;
      $return_array[3] = $image_th;
      $return_array[4] = $productServiceName;
      $return_array[5] = $formProductService;
      if($allToAll){
          $search_name =  "'" . $formElementArray['search_display'][0] . "'";
          $info_array = get_listings_products_info($search_name);
          $list_id_location_array = Array();
          array_walk($info_array, function($value, $idx) use (&$list_id_location_array,$return_array,$productServiceName,$image_th,$formElementArray,$map){
              $location = "'". '#'.$value[0].'#' .':'.$value[1].':'.$formElementArray['phone'][0].':'.$map ."'";
              array_push($list_id_location_array,Array("'".$value[1]."'","'" .$return_array[1] ."'","'".$productServiceName."'","'".$image_th."'",$location));
          });          
        $return_array[0] = $return_array[0] && insert_multi_listings_products($list_id_location_array);
      }
      else{
        $location = "'". '#'.$formElementArray['island_id'][0].'#' .':'.$formElementArray['list_id'][0].':'.$formElementArray['phone'][0].':'.$map ."'";
        $new_product_id =  "'" . $return_array[1] . "'";
        $list_id = "'" . $formElementArray['list_id'][0] . "'";
        $return_array[0] = $return_array[0] && insert_listing_product($list_id, $new_product_id,$insert_product_service_array['product_name'],$insert_product_service_array['thumbnail'],$location);   
      }
    }
  }
            
  else{
      $return_array[0] = false;
  } //if $formValid
  return json_encode($return_array);
}