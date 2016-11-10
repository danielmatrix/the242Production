<?php
session_start();

function htmlSalesEvents($listId, $search_display, $map, $island_id, $full_address){
  $previous_file = '';
  $image = '';
  $status = 'add';
  $title = '';
  $description = '';
  $start_date = '';
  $end_date = '';
  $list_id = '';
  $active = '';
  
  extract(get_sales_events($listId));
  //id, title, description, image, start_date,end_date,active 

  if(isset($id) && $id > 0){
    $status = 'edit';
    $active =  $active === 'Y' ? 'checked' : ''; 
  }


  


$formSalesEvents = <<<EOT
  <form id="sales_events" class="" enctype="multipart/form-data" method="post" name="sales_events" data-element="formSalesEvents" data-status="$status" novalidate>
    
    <div class="form-group form-group-sm">
      <label for="title">Sales Event Title</label>
      <input value="$title" class="form-control" type="text" id="title" name="title" placeholder="Sales Event Title" data-validateMethod="productName" data-label="title" data-errorClass="text-danger" data-required="1" data-form="sales_events">
    </div> 

    <div>
      <img src='$image' class='img-responsive center-block' alt='Sales Event Photo' title='Sales Event Photo'>
    </div> 

    <div class="form-group form-group-sm">
      <label for="description">Promotion Description</label>
        <textarea id="description" name="description" class="form-control" rows="3" data-required="1" data-label="description" data-validateMethod="description" data-errorClass="text-danger" data-form="sales_events">$description</textarea>
    </div>    

    <div class="form-group form-group-sm">
      <label for="start_date">Start Date</label><br/>
      <input value="$start_date" id="start_date" type="text" class="form-control" name="start_date" placeholder="mm/dd/yyyy" data-required="1" data-validateMethod="birthday"  data-label="start_date" data-errorClass="text-danger" data-form="sales_events">
    </div> 

    <div class="form-group form-group-sm">
      <label for="end_date">End Date</label><br/>
      <input value="$end_date" id="end_date" type="text" class="form-control" name="end_date" placeholder="mm/dd/yyyy" data-required="1" data-validateMethod="birthday"  data-label="end_date" data-errorClass="text-danger" data-form="sales_events">
    </div> 


    <div class="form-group form-group-sm">
      <label for="salesEventPhoto" class="control-label">Promotional Photo</label>
      <div class="">
        <input type="file" id="salesEventPhoto" name="salesEventPhoto" data-required="0"  data-element="btnsalesEventPhoto"  data-previous_photo="$image">
        <p class="help-block">Please select an image file of type JPEG, PNG, or GIF, being 150 kb or smaller. Recommended: Width 400 px Height 300 px</p>
      </div>
    </div>

    <div class="checkbox">
      <label for="active">
        <input value='Y' type="checkbox"  id="active" name="active" data-validateMethod=""  data-label="active" data-errorClass="text-danger" data-required="0" data-form="sales_events" $active>
        <b><small>Promotion is currently active.</small></b>
      </label>
    </div>     

    <div class="form-group form-group-sm">
      <div class="">
        <button id="btnSalesEvents" type="button" data-list_id="$listId" data-search_display="$search_display" data-map="$map" data-island_id="$island_id" class="btn btn-primary btn-xs" data-element="btnSubmitSalesEvents" data-form="sales_events" data-fullAddress="$full_address">Apply</button>
      </div>
    </div>
    <div id="salesEventsAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
  </form>
EOT;

   return $formSalesEvents;
}