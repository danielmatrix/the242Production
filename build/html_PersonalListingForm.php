<?php
session_start();

function htmlFreePersonalForm($dbc, $edit, $listId){
  $formStatus = 'add';
  $firstName = '';
  $middleName = '';
  $lastName = '';
  $memberEmail = '';
  $town = '';
  $island = '';
  $phone = '';
  $postal = '';
  $address = '';
  $island = '';
  $phone = '';
  $memberInfo = '';
  $previous_searchNname = '';
  $photo = '';



  if($edit){
    $formStatus = 'edit';
    $data_array = edit_free_personal($dbc, $listId);
    $previous_searchNname = $data_array[search_display];
    $name_array = explode(' ',$data_array[page_name]);
    $lastName = trim(array_shift($name_array));
    $firstName = trim(array_shift($name_array));
    $middleName = trim(implode(' ',$name_array));
    
    $phone = trim($data_array[area_code]);
    $phone .= '-' . trim($data_array[phone_number]);
    $postal = trim($data_array[postal_code]);
    $address = trim($data_array[address]);
    $island = $data_array[island_name];
    $memberEmail = trim($data_array[email]);
    $memberInfo = trim($data_array[description]);
    $photo = trim($data_array[image_file]);

  }

$formdataPersonal = <<<EOT
    <div id="form_freePersonal">
      <h5 class="well well-sm col-sm-offset-2 col-sm-10"><span class="text-primary">Free Personal Listing</span> <a id="calcelFreeList" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='cancelFreeListing'><span class="text-muted"><small>Cancel</small><span></a></h5>

      <form id="freeMemberPersonal" class="form-horizontal" enctype="multipart/form-data" method="post" name="freeMemberPersonal" data-element="formFreePersonal" data-status="$formStatus" novalidate>

        <div class="form-group form-group-sm">
          <label for="freeMemberFirstName" class="col-sm-2 control-label">First Name</label>
          <div class="col-sm-10">
            <input value="$firstName" type="text" class="form-control" id="freeMemberFirstName" name="freeMemberFirstName" placeholder="First Name" data-validateMethod="firstname" data-label="freeMemberFirstName" data-errorClass="text-danger" data-required="1" data-form="freeMemberPersonal">
          </div>
        </div>
        
        <div class="form-group form-group-sm">
          <label for="freeMemberMiddleName" class="col-sm-2 control-label">Middle Name</label>
          <div class="col-sm-10">
            <input value ="$middleName" type="text" class="form-control" id="freeMemberMiddleName" name="freeMemberMiddleName" placeholder="Middle Name" data-validateMethod="middlename" data-label="freeMemberMiddleName" data-errorClass="text-danger" data-required="0" data-form="freeMemberPersonal">
          </div>
        </div>
        
        <div class="form-group form-group-sm">
          <label for="freeMemberFamilyName" class="col-sm-2 control-label">Family Name</label>
          <div class="col-sm-10">
            <input value="$lastName" type="text" class="form-control" id="freeMemberFamilyName" name="freeMemberFamilyName" placeholder="Family Name" data-validateMethod="lastname" data-label="freeMemberFamilyName" data-errorClass="text-danger" data-required="1" data-form="freeMemberPersonal">
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="freeMemberEmail" class="col-sm-2 control-label">Email address</label>
          <div class="col-sm-10">  
            <input value="$memberEmail" type="email" class="form-control" id="freeMemberEmail" name="freeMemberEmail" placeholder="Enter your email" data-validateMethod="emailunique"  data-label="freeMemberEmail" data-errorClass="text-danger" data-required="0"  data-form="freeMemberPersonal">
          </div>  
        </div> 

        <div class="form-group form-group-sm">
          <label for="freeMemberPostal" class="col-sm-2 control-label">Mail To:</label>
          <div class="col-sm-10">
            <input value="$postal" type="text" class="form-control" id="freeMemberPostal" name="freeMemberPostal" placeholder="Postal Address" data-validateMethod="businessName" data-label="freeMemberPostal" data-errorClass="text-danger" data-required="0" data-form="freeMemberPersonal">
          </div>
        </div>

        <div class="form-group form-group-sm">
          <label for="freeMemberAddress" class="col-sm-2 control-label">Address</label>
          <div class="col-sm-10">
            <input value="$address" type="text" class="form-control" id="freeMemberAddress" name="freeMemberAddress" placeholder="Street Address" data-validateMethod="addressname" data-label="freeMemberAddress" data-errorClass="text-danger" data-required="0" data-form="freeMemberPersonal">
          </div>
        </div>              
        
        <div class="form-group form-group-sm">
          <label for="freeMemberIsland" class="col-sm-2 control-label">Island</label>
          <div class="col-sm-10">
            <input value="$island" type="text" class="form-control" id="freeMemberIsland" name="freeMemberIsland" placeholder="Island where you reside" data-validateMethod="island"  data-label="freeMemberIsland" data-errorClass="text-danger" data-required="1" data-form="freeMemberPersonal">
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="freeMemberPhone" class="col-sm-2 control-label">Phone</label>
          <div class="col-sm-10">
            <input value="$phone" id="freeMemberPhone" type="text" class="form-control" name="freeMemberPhone" value="" placeholder="242-555-5555" data-validateMethod="phone"  data-label="freeMemberPhone" data-errorClass="text-danger" data-required="1"  data-form="freeMemberPersonal">
          </div>
        </div>


        <div class="form-group form-group-sm">
          <label for="freeMemberPhoto" class="col-sm-2 control-label">Photo</label>
          <div class="col-sm-10">
            <input type="file" id="freeMemberPhoto" name="freeMemberPhoto" data-required="0" data-previous_photo ="$photo" data-element="btnSelectPhoto">
            <p class="help-block">Please select an image file of type JPEG, PNG, or GIF, being 100kb or smaller</p>
          </div>
        </div>        

        <div class="form-group form-group-sm">
          <label for="freeMemberInfo" class="col-sm-2 control-label">Additional Info</label>
          <div class="col-sm-10">
            <textarea id="freeMemberInfo" name="freeMemberInfo" class="form-control" rows="3" data-required="0">$memberInfo</textarea>
          </div>
        </div>
      

        <div class="form-group form-group-sm">
          <div class="col-sm-offset-2 col-sm-10">
            <button id="btnFreePersonal" type="submit"  class="btn btn-primary btn-xs" data-element="btnFreePersonal" data-form="freeMemberPersonal" data-listID="$listId" data-searchName="$previous_searchNname">Apply</button>
          </div>
        </div>
        <div id="formPersonalMemberAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
      </form>
    </div>
EOT;

   return $formdataPersonal;
}

