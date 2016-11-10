<?php
session_start();

function htmlProductService($list_id, $island_id, $search_display, $map, $phone ,$form_status, $product_id, $website, $address){

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

if($form_status === 'edit'){
  $product_info_array = edit_product_info($product_id);
  extract($product_info_array);

  if($on_line_purchase === 'Y')
    $on_line_purchase = 'checked';
  else{
    $on_line_purchase = '';
  }

  if(empty($season_id)){
    $season_id = '0';
  }

  if($apply_to_all === 'Y'){
    $apply_to_all = 'checked';    
  }
  else{
    $apply_to_all = '';
  }

  if($sale_enabled === 'Y'){
    $sale_enabled = 'checked';  
  }
  else{
    $sale_price = ''; 
  }
  if($in_stock === 'Y'){
    $in_stock = 'checked';  
  }

  if($new_arrival === 'Y'){
    $new_arrival = 'checked'; 
  }

  if(strlen($image) > 0){
    $photo = "<img src='../$image' class='img-responsive center-block' alt='Product Image' title='Product Image'>";
  }

  $formProductService = <<<EOT
      <h5 class="well well-sm col-sm-offset-2 col-sm-10"><span class="text-primary">Products &amp; Services</span> <a id="calcelProductService" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='cancelProductService'><span class="text-muted"><small>Cancel</small><span></a></h5>

      <form id="productService" class="form-horizontal" enctype="multipart/form-data" method="post" name="productService" data-element="productService" data-status="edit" novalidate>

        <div class="form-group form-group-sm">
          <label for="productServiceName" class="col-sm-2 control-label">Name</label>
          <div class="col-sm-10">
            <input value="$product_name" type="text" class="form-control input-sm" id="productServiceName" name="productServiceName" placeholder="Product or Service Name" data-validateMethod="productName" data-label="productServiceName" data-errorClass="text-danger" data-required="1" data-form="productService">
          </div>
        </div>

        <div class="form-group form-group-sm">
          <label for="productServiceInfo" class="col-sm-2 control-label">Description</label>
          <div class="col-sm-10">
            <textarea id="productServiceInfo" name="productServiceInfo" class="form-control" rows="10" data-required="0">$description</textarea>
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
              <input value="$category" type="text" class="form-control input-sm" id="category" name="category" placeholder="Category" data-validateMethod="productName" data-label="category" data-errorClass="text-danger" data-required="0" data-form="productService">
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
              <input value="$subcategory" type="text" class="form-control input-sm" id="subcategory" name="subcategory" placeholder="Sub Category" data-validateMethod="productName" data-label="subcategory" data-errorClass="text-danger" data-required="0" data-form="productService">
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
            <textarea id="keywords" name="keywords" class="form-control" rows="10" data-required="0">$keywords</textarea>
          </div>
        </div>                      
      
       <div id="previous_photo">
        $photo 
       </div> 

        <div class="form-group form-group-sm">
          <label for="productPhoto" class="col-sm-2 control-label">Photo</label>
          <div class="col-sm-10">
            <input type="file" class="input-sm" id="productPhoto" name="productPhoto" data-required="0" data-previous_photo="$image" data-element="btnProductPhoto">
            <p class="help-block">Please select an image file of type JPEG, PNG, or GIF, being 10kb or smaller (max width: 200px max height: 300px)</p>
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="productServicePrice" class="col-sm-2 control-label">Price</label>
          <div class="col-sm-10">
            <input value="$price" type="text" class="form-control input-sm" id="productServicePrice" name="productServicePrice" placeholder="0.00" data-validateMethod="price" data-label="productServicePrice" data-errorClass="text-danger" data-required="1" data-form="productService">
          <hr class="hr_product_service">
          </div>
        </div> 
        
        <div class="form-group form-group-sm">
          <label for="discountEnabled" class="col-sm-2 control-label">On Sale</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" id="discountEnabled" name="discountEnabled" data-validateMethod="" data-label="discountEnabled" data-errorClass="text-danger" data-required="0" data-form="productService" $sale_enabled>
          </div>
        </div>          
  

        <div class="form-group form-group-sm">
          <label for="discountPrice" class="col-sm-2 control-label">Sale Price</label>
          <div class="col-sm-10">
            <input 
             value="$sale_price" type="text" class="form-control input-sm" id="discountPrice" name="discountPrice" placeholder="0.00" data-validateMethod="price" data-label="discountPrice" data-errorClass="text-danger" data-required="0" data-form="productService">
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="discountEndDate" class="col-sm-2 control-label">Sale End</label>
          <div class="col-sm-10">
            <input
              id="discountEndDate" type="text" class="form-control input-sm" name="discountEndDate"  value="$sale_end_date" placeholder="mm/dd/yyyy" data-required="0" data-validateMethod="birthday"  data-label="discountEndDate" data-errorClass="text-danger" data-form="productService">
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="season_price" class="col-sm-2 control-label">Season</label>
          <div class="col-sm-10">
            <input
              id="season_price" type="text" class="form-control input-sm" name="season_price"  value="$season_price" placeholder="Season Special" data-required="0" data-validateMethod=""  data-label="season_price" data-errorClass="text-danger" data-form="productService">
            <hr class="hr_product_service">
          </div>
        </div>                 

        <div class="form-group form-group-sm">
          <label for="inStock" class="col-sm-2 control-label">In Stock</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" class="" id="inStock" name="inStock" data-validateMethod="" data-label="inStock" data-errorClass="text-danger" data-required="0" data-form="productService" $in_stock >
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="onlinepurchase" class="col-sm-2 control-label">Online</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" class="" id="onlinepurchase" name="onlinepurchase" data-validateMethod="" data-label="onlinepurchase" data-errorClass="text-danger" data-required="0" data-form="productService" $on_line_purchase>
            <p class="help-block">This item available for purchase online at our website</p>            
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="addToAll" class="col-sm-2 control-label">Add to all</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" class="" id="addToAll" name="addToAll" data-validateMethod="" data-label="addToAll" data-errorClass="text-danger" data-required="0" data-form="productService" $apply_to_all>
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="newArrival" class="col-sm-2 control-label">New Arrival</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" class="" id="newarrival" name="newarrival" data-validateMethod="" data-label="newarrival" data-errorClass="text-danger" data-required="0" data-form="productService" $new_arrival>
          </div>
        </div>                

        <div class="form-group form-group-sm">
          <div class="col-sm-offset-2 col-sm-10">
            <button id="btnProductService" type="submit"  class="btn btn-primary btn-xs" data-season_id="$season_id" data-element="btnProductService" data-form="productService" data-website="$website" data-phone="$phone" data-listid="$list_id" data-island_id="$island_id" data-map="$map" data-search_display="$search_display" data-product_id="$product_id" data-li_id='' data-address="$address"> Apply</button>
          </div>
        </div>
        <div id="formProductServiceAlert" class="alert alert-danger col-sm-offset-2 col-sm-10" role="alert">There were errors! Please check your entries.</div>
      </form>


EOT;
} 

if($form_status === 'add'){
  $product_name = '';
  $description = ''; 
  $price = ''; 
  $keywords = ''; 
  $sale_enabled = '';
  $sale_price = '';
  $sale_end_date = ''; 
  $in_stock = '';
  $image = '';
  $category = '';
  $subcategory = '';
  $on_line_purchase = '';
  $season_price = ''; 
  $season_id = '0';


$formProductService = <<<EOT

<div class="row">
  <div class="col-md-4">
  <button id="btnGetProductService" class="btn btn-primary btn-xs" data-element="btnGetProductService" data_listId="$list_id">Get Products and Services</button>
    <a class='editAddAllProduct btn btn-success btn-xs' role='menuitem' tabindex='-1' href='#' data-listId='$list_id' data-element='aAddAllProductsTo'>Add All</a>  
    
    <a class='editRemoveAllProduct btn btn-danger btn-xs pull-right' role='menuitem' tabindex='-1' href='#' data-listId='$list_id' data-element='aRemoveFromAll'>Remove All</a>
    <ul class="list-group" id="ul_product_service">
    </ul>
  </div>
 

 <div class="col-md-8">
    <div id="form_ProductService">
      <h5 class="well well-sm col-sm-offset-2 col-sm-10"><span class="text-primary">Products &amp; Services</span> <a id="calcelProductService" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='cancelProductService'><span class="text-muted"><small>Cancel</small><span></a></h5>

      <form id="productService" class="form-horizontal" enctype="multipart/form-data" method="post" name="productService" data-element="productService" data-status="add" novalidate>

        <div class="form-group form-group-sm">
          <label for="productServiceName" class="col-sm-2 control-label">Name</label>
          <div class="col-sm-10">
            <input value="$product_name" type="text" class="form-control input-sm" id="productServiceName" name="productServiceName" placeholder="Product or Service Name" data-validateMethod="productName" data-label="productServiceName" data-errorClass="text-danger" data-required="1" data-form="productService">
          </div>
        </div>

        <div class="form-group form-group-sm">
          <label for="productServiceInfo" class="col-sm-2 control-label">Description</label>
          <div class="col-sm-10">
            <textarea id="productServiceInfo" name="productServiceInfo" class="form-control" rows="10" data-required="0">$description</textarea>
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
            <textarea id="keywords" name="keywords" class="form-control" rows="10" data-required="0">$keywords</textarea>
          </div>
        </div>                      
      
       <div id="previous_photo">
        $image 
       </div> 

        <div class="form-group form-group-sm">
          <label for="productPhoto" class="col-sm-2 control-label">Photo</label>
          <div class="col-sm-10">
            <input type="file" class="input-sm" id="productPhoto" name="productPhoto" data-required="0" data-previous_photo="$image" data-element="btnProductPhoto">
            <p class="help-block">Please select an image file of type JPEG, PNG, or GIF, being 10kb or smaller (max width: 200px max height: 300px)</p>
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="productServicePrice" class="col-sm-2 control-label">Price</label>
          <div class="col-sm-10">
            <input value="$price" type="text" class="form-control input-sm" id="productServicePrice" name="productServicePrice" placeholder="0.00" data-validateMethod="price" data-label="productServicePrice" data-errorClass="text-danger" data-required="1" data-form="productService">
          <hr class="hr_product_service">
          </div>
        </div> 
        
        <div class="form-group form-group-sm">
          <label for="discountEnabled" class="col-sm-2 control-label">On Sale</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" id="discountEnabled" name="discountEnabled" data-validateMethod="" data-label="discountEnabled" data-errorClass="text-danger" data-required="0" data-form="productService" $sale_enabled>
          </div>
        </div>          

        <div class="form-group form-group-sm">
          <label for="discountPrice" class="col-sm-2 control-label">Sale Price</label>
          <div class="col-sm-10">
            <input 
             value="$sale_price" type="text" class="form-control input-sm" id="discountPrice" name="discountPrice" placeholder="0.00" data-validateMethod="price" data-label="discountPrice" data-errorClass="text-danger" data-required="0" data-form="productService">
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
            <input value="Y" type="checkbox" class="" id="inStock" name="inStock" data-validateMethod="" data-label="inStock" data-errorClass="text-danger" data-required="0" data-form="productService" $in_stock >
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="onlinepurchase" class="col-sm-2 control-label">Online</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" class="" id="onlinepurchase" name="onlinepurchase" data-validateMethod="" data-label="onlinepurchase" data-errorClass="text-danger" data-required="0" data-form="productService" $on_line_purchase>
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
            <button id="btnProductService" type="submit"  class="btn btn-primary btn-xs" data-season_id="$season_id" data-element="btnProductService" data-productServiceId="" data-form="productService" data-website="$website" data-phone="$phone" data-listid="$list_id" data-island_id="$island_id" data-map="$map" data-search_display="$search_display" data-product_id="$product_id" data-li_id='' data-address="$address"> Apply</button>
          </div>
        </div>
        <div id="formProductServiceAlert" class="alert alert-danger col-sm-offset-2 col-sm-10" role="alert">There were errors! Please check you entries.</div>
      </form>
    </div>
  </div>
</div>    
EOT;
}
   return $formProductService;
}

