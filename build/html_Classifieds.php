<?php
session_start();

function htmlClassifiedsForm($control_number){


  $member_id = $_SESSION['memberId'];  
  extract(get_member_info($member_id));
  $phone = $phone_contact; 
  $formStatus = 'add';
  $active_status = '';
  $pre_image_1 = '';
  $pre_image_2 = '';
  $pre_image_3 = '';
  $pre_image_4 = '';
  $image_1 = 'images/classified/placeholder.png';
  $image_2 = 'images/classified/placeholder.png';
  $image_3 = 'images/classified/placeholder.png';
  $image_4 = 'images/classified/placeholder.png';

  extract(get_member_classified($member_id,$control_number));
    //adline, description, phone, email, `island_id`, pricing, image_1, image_2, image_3, image_4, active 
  if(isset($active) && strlen($active) === 1){
    $formStatus = 'edit';
      $pre_image_1 = $image_1;
      $pre_image_2 = $image_2;
      $pre_image_3 = $image_3;
      $pre_image_4 = $image_4;
      $image_1 = strlen($image_1) > 0 ? $image_1 : 'images/classified/placeholder.png';
      $image_2 = strlen($image_2) > 0 ? $image_2 : 'images/classified/placeholder.png';
      $image_3 = strlen($image_3) > 0 ? $image_3 : 'images/classified/placeholder.png';
      $image_4 = strlen($image_4) > 0 ? $image_4 : 'images/classified/placeholder.png';

    if($active === 'Y'){
      $active_status = 'checked';
    }
  }

$formdataCalssified = <<<EOT
      <h5 class="well well-sm"><span class="text-primary">Free Member Classified</span> 
        <a href="#" class="pull-right btn btn-default btn-xs btn-cancel doneClassified" data-element="doneClassified">
        <span class="text-muted"><small>Done</small></span>
        </a> 
      </h5>
    <div id="carousel-class$control_number" class="carousel slide" data-ride="carousel" data-interval>
      <div class="carousel-inner" role="listbox">
          <div class="item active">
            <img class="center-block" src="$image_1" alt="Photo 1">
          </div>
          <div class="item">
            <img class="center-block" src="$image_2" alt="Photo 2">
          </div>
          <div class="item">
            <img class="center-block" src="$image_3" alt="Photo 3">
          </div> 
          <div class="item">
            <img class="center-block" src="$image_4" alt="Photo 4">
          </div>       
        </div>
        <a class="left carousel-control" href="#carousel-class$control_number" role="button" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        </a>
        <a class="right carousel-control" href="#carousel-class$control_number" role="button" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </a>
      </div> 
    </div>     

      <form id="freeMemberClassified$control_number" class="" enctype="multipart/form-data" method="post" name="freeMemberClassified$control_number" data-element="freeMemberClassified$control_number" data-status="$formStatus" novalidate>

        <div class="form-group form-group-sm">
          <label for="adLine$control_number">Ad Line</label>
          <input value="$adline" type="text" maxlength="75" class="form-control input-sm" id="adLine$control_number" name="adLine$control_number" placeholder="Item for Sale" data-validateMethod="productName" data-label="adLine$control_number" data-errorClass="text-danger" data-required="1" data-form="freeMemberClassified$control_number">
        </div>

        <div class="form-group form-group-sm">
          <label for="description$control_number">Description</label>
          <textarea id="description$control_number" name="description$control_number" class="form-control" rows="10" data-required="1" data-validateMethod="description" data-form="freeMemberClassified$control_number" data-errorClass="text-danger" data-label="description$control_number">$description</textarea>
        </div        

        <div class="form-group form-group-sm">
          <label for="email$control_number">email</label>
          <input value="$email" type="text"  class="form-control input-sm" id="email$control_number" name="email$control_number" placeholder="Enter contact email" data-validateMethod="emailvalid" data-label="email$control_number" data-errorClass="text-danger" data-required="0" data-form="freeMemberClassified$control_number">
        </div>

        <div class="form-group form-group-sm">
          <label for="phone$control_number">Phone</label>
          <input value="$phone" type="text"  class="form-control input-sm" id="phone$control_number" name="phone$control_number" placeholder="242-555-5555" data-validateMethod="phone" data-label="phone$control_number" data-errorClass="text-danger" data-required="1" data-form="freeMemberClassified$control_number">
        </div>                       
     
        <div class="form-group form-group-sm">
          <label for="classifiedIsland$control_number">Island</label>
            <input value="$island" type="text" class="form-control" id="classifiedIsland$control_number" name="classifiedIsland$control_number" placeholder="Island location for item" data-validateMethod="island"  data-label="classifiedIsland$control_number" data-errorClass="text-danger" data-required="1" data-form="freeMemberClassified$control_number">
        </div> 

        <div class="form-group form-group-sm">
          <label for="pricing$control_number">Pricing Information</label>
          <input value="$pricing" type="text"  class="form-control input-sm" id="pricing$control_number" name="pricing$control_number" placeholder="$0.00 or O.B.O." data-validateMethod="productName" data-label="pricing$control_number" data-errorClass="text-danger" data-required="1" data-form="freeMemberClassified$control_number">
        </div>  


        <div class="form-group form-group-sm">
          <label for="image_1$control_number">Photo 1</label>
          <input type="file" id="image_1$control_number" name="image_1$control_number" data-required="0" data-previous_photo ="$pre_image_1" data-element="btnSelectImage">
          <p class="help-block">Please select a photo of type JPEG, PNG, or GIF, being 50kb or smaller (Height 300px, Width 400px)</p>
        </div> 

        <div class="form-group form-group-sm">
          <label for="image_2$control_number">Photo 2</label>
          <input type="file" id="image_2$control_number" name="image_2$control_number" data-required="0" data-previous_photo ="$pre_image_2" data-element="btnSelectImage">
          <p class="help-block">Please select a photo of type JPEG, PNG, or GIF, being 50kb or smaller (Height 300px, Width 400px)</p>
        </div>

        <div class="form-group form-group-sm">
          <label for="image_3$control_number">Photo 3</label>
          <input type="file" id="image_3$control_number" name="image_3$control_number" data-required="0" data-previous_photo ="$pre_image_3" data-element="btnSelectImage">
          <p class="help-block">Please select a photo of type JPEG, PNG, or GIF, being 50kb or smaller (Height 300px, Width 400px)</p>
        </div>

        <div class="form-group form-group-sm">
          <label for="image_4$control_number">Photo 4</label>
          <input type="file" id="image_4$control_number" name="image_4$control_number" data-required="0" data-previous_photo ="$pre_image_4" data-element="btnSelectImage">
          <p class="help-block">Please select a photo of type JPEG, PNG, or GIF, being 50kb or smaller (Height 300px, Width 400px)</p>
        </div>

        <div class="form-group form-group-sm">
          <label for="active$control_number" class="control-label">Active</label>
            <input value="Y" type="checkbox" id="active$control_number" name="active$control_number" data-validateMethod="" data-label="active$control_number" data-errorClass="text-danger" data-required="0" data-form="freeMemberClassified$control_number" $active_status>
        </div>                 


        <div class="form-group form-group-sm">
            <button id="btnClassified" type="submit" data-control="$control_number"  class="btn btn-primary btn-xs" data-element="btnSubmitClassified" data-form="freeMemberClassified$control_number" >Save</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button id="btnResetClassified" type="button"  class="btn btn-warning btn-xs" data-element="btnResetClassified" data-form="freeMemberClassified$control_number" >Cancel Changes</button>
        </div>
        <div id="formClassifiedAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
      </form>
EOT;

   return $formdataCalssified;
}