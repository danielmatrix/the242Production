<?php
session_start();

function htmlFreeBusinessForm($dbc, $edit, $listId){
  $formStatus = 'add';
  $businessName = '';
  $phone = '';
  $postal = '';
  $address = '';
  $island = '';
  $email = '';
  $website = '';
  $map = '';
  $keywords = '';
  $description = '';
  $hours = '';
  $photo = '';  
  $previous_searchNname = '';
  //Type of Business
  $tob_lable = 'Type of Business';
  $tob_placeholder = 'Enter business category up to 60 characters';
  $tob_validateMethod = 'keywords';
  $hours = '<table class="table table-hover table-condensed table-bordered" id="businesshours">
            <caption contenteditable class="hours">Edit Business Hours</caption>
              <tbody>
                <tr>
                  <th class="text-info">Weekday</th>
                  <th class="text-info">Open</th>
                  <th class="text-info">Close</th>
                </tr> 

                <tr>
                  <th class="text-info">Sunday</th>
                  <td contenteditable class="text-muted" data-element="businesshours">example 9:00 am or Closed or 24hrs</td>
                  <td contenteditable class="text-muted" data-element="businesshours">example 5:30 pm or Closed or 24hrs</td>
                </tr>

                <tr>
                  <th class="text-info">Monday</th>
                  <td contenteditable class="text-muted" data-element="businesshours">example 9:00 am or Closed or 24hrs</td>
                  <td contenteditable class="text-muted" data-element="businesshours">example 5:30 pm or Closed or 24hrs</td>
                </tr> 

                <tr>
                  <th class="text-info">Tuesday</th>
                  <td contenteditable class="text-muted" data-element="businesshours">example 9:00 am or Closed or 24hrs</td>
                  <td contenteditable class="text-muted" data-element="businesshours">example 5:30 pm or Closed or 24hrs</td>
                </tr> 
                <tr>
                  <th class="text-info">Wednesday</th>
                  <td contenteditable class="text-muted" data-element="businesshours">example 9:00 am or Closed or 24hrs</td>
                  <td contenteditable class="text-muted" data-element="businesshours">example 5:30 pm or Closed or 24hrs</td>
                </tr> 

                <tr>
                  <th class="text-info">Thursday</th>
                  <td contenteditable class="text-muted" data-element="businesshours">example 9:00 am or Closed or 24hrs</td>
                  <td contenteditable class="text-muted" data-element="businesshours">example 5:30 pm or Closed or 24hrs</td>
                </tr> 

                <tr>
                  <th class="text-info">Friday</th>
                  <td contenteditable class="text-muted" data-element="businesshours">example 9:00 am or Closed or 24hrs</td>
                  <td contenteditable class="text-muted" data-element="businesshours">example 5:30 pm or Closed or 24hrs</td>
                </tr> 

                <tr>
                  <th class="text-info">Saturday</th>
                  <td contenteditable class="text-muted" data-element="businesshours">example 9:00 am or Closed or 24hrs</td>
                  <td contenteditable class="text-muted" data-element="businesshours">example 5:30 pm or Closed or 24hrs</td>
                </tr>                                                                       
              </tbody>
            </table>';
  $new_hours = $hours;          
  

  if($edit){
    $formStatus = 'edit';
    $sql_result =  @mysqli_query($dbc,"CALL edit_free_business_listing($listId)");
    $row_wl = mysqli_fetch_assoc($sql_result); 
    extract($row_wl) ;
    if(!isset($hours)){$hours = $new_hours;}
    if($source === 'PB'){
      $tob_lable = 'Keywords';
      $tob_placeholder = 'Enter keywords that help users to find your business';
      $tob_validateMethod = 'keywords_PB';      
    }
  }


$formdataFreeBusiness = <<<EOT
    <div id="form_freeBusiness">
      <h5 class="well well-sm col-sm-offset-2 col-sm-10"><span class="text-primary">Free Business Listing</span> <a id="calcelFreeBusinessList" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='cancelFreeBusinessListing'><span class="text-muted"><small>Cancel</small><span></a></h5>

      <form id="freeBusinessListing" class="form-horizontal" enctype="multipart/form-data" method="post" name="freeBusinessListing" data-element="formFreeBusiness" data-status="$formStatus" novalidate>

        <div class="form-group form-group-sm">
          <label for="freeBusinessName" class="col-sm-2 control-label">Name</label>
          <div class="col-sm-10">
            <input value="$businessName" type="text" class="form-control" id="freeBusinessName" name="freeBusinessName" placeholder="Business Name" data-validateMethod="businessName" data-label="freeBusinessName" data-errorClass="text-danger" data-required="1" data-form="freeBusinessListing">
          </div>
        </div>

        <div class="form-group form-group-sm">
          <label for="freeBusinessPhone" class="col-sm-2 control-label">Phone</label>
          <div class="col-sm-10">
            <input value="$phone" id="freeBusinessPhone" type="text" class="form-control" name="freeBusinessPhone" value="" placeholder="242-555-5555" data-validateMethod="phone"  data-label="freeBusinessPhone" data-errorClass="text-danger" data-required="1"  data-form="freeBusinessListing">
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="freeBusinessPostal" class="col-sm-2 control-label">Mail To:</label>
          <div class="col-sm-10">
            <input value="$postal" type="text" class="form-control" id="freeBusinessPostal" name="freeBusinessPostal" placeholder="Postal Address" data-validateMethod="addressname" data-label="freeBusinessPostal" data-errorClass="text-danger" data-required="0" data-form="freeBusinessListing">
          </div>
        </div>        

        <div class="form-group form-group-sm">
          <label for="freeBusinessAddress" class="col-sm-2 control-label">Address</label>
          <div class="col-sm-10">
            <input value="$address" type="text" class="form-control" id="freeBusinessAddress" name="freeBusinessAddress" placeholder="Street Address, Town" data-validateMethod="addressname" data-label="freeBusinessAddress" data-errorClass="text-danger" data-required="1" data-form="freeBusinessListing">
          </div>
        </div>
       
        <div class="form-group form-group-sm">
          <label for="freeBusinessIsland" class="col-sm-2 control-label">Island</label>
          <div class="col-sm-10">
            <input value="$island" type="text" class="form-control" id="freeBusinessIsland" name="freeBusinessIsland" placeholder="Island where you reside" data-validateMethod="island"  data-label="freeBusinessIsland" data-errorClass="text-danger" data-required="1" data-form="freeBusinessListing">
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="freeBusinessEmail" class="col-sm-2 control-label">Email</label>
          <div class="col-sm-10">  
            <input value="$email" type="email" class="form-control" id="freeBusinessEmail" name="freeBusinessEmail" placeholder="Enter your email" data-validateMethod="emailvalid"  data-label="freeBusinessEmail" data-errorClass="text-danger" data-required="0"  data-form="freeBusinessListing">
          </div>  
        </div> 

        <div class="form-group form-group-sm">
          <label for="freeBusinessWeb" class="col-sm-2 control-label">Website</label>
          <div class="col-sm-10"> 
            <input value="$website" type="text" class="form-control" id="freeBusinessWeb" name="freeBusinessWeb" placeholder="Business Website URL" data-validateMethod="webURL"  data-label="freeBusinessWeb" data-errorClass="text-danger" data-required="0"  data-form="freeBusinessListing">
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="freeBusinessMap" class="col-sm-2 control-label">Map Coordinates</label>
          <div class="col-sm-10"> 
            <input value="$map" type="text" class="form-control" id="freeBusinessMap" name="freeBusinessMap" placeholder="Enter location map coordinates" data-validateMethod="mapCor"  data-label="freeBusinessMap" data-errorClass="text-danger" data-required="0"  data-form="freeBusinessListing">
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="freeBusinessKeywords" class="col-sm-2 control-label">$tob_lable</label>
          <div class="col-sm-10"> 
            <textarea class="form-control" id="freeBusinessKeywords" name="freeBusinessKeywords" placeholder="$tob_placeholder" data-validateMethod="$tob_validateMethod"  data-label="freeBusinessKeywords" data-errorClass="text-danger" data-required="1"  data-form="freeBusinessListing">$keywords</textarea>
          </div>
        </div> 

        <div class="row">
          <div class="col-sm-10 col-sm-offset-2" id='divhours'>
            $hours
          </div>
        </div>

        <div class="form-group form-group-sm">
          <label for="freeBusinessInfo" class="col-sm-2 control-label">Description</label>
          <div class="col-sm-10">
            <textarea id="freeBusinessInfo" name="freeBusinessInfo" class="form-control" rows="10" data-validateMethod="description" data-label="freeBusinessInfo" data-errorClass="text-danger" data-required="1"  data-form="freeBusinessListing">$description</textarea>
          </div>
        </div>       

        <div class="form-group form-group-sm">
          <label for="freeBusinessPhoto" class="col-sm-2 control-label">Ad</label>
          <div class="col-sm-10">
            <input type="file" id="freeBusinessPhoto" name="freeBusinessPhoto" data-required="0" data-previous_photo ="$photo" data-element="btnSelectPhoto">
            <p class="help-block">Please select an image file of type JPEG, PNG, or GIF, being 100kb or smaller</p>
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <div class="col-sm-offset-2 col-sm-10">
            <button id="btnFreeBusiness" type="submit"  class="btn btn-primary btn-xs" data-source="$source" data-element="btnFreeBusiness" data-listid="$listId" data-form="freeBusinessListing" data-searchName="$search_display">Apply</button>
          </div>
        </div>
        <div id="formFreeBusinessAlert" class="alert alert-danger" role="alert">There were errors! Please check your entries.</div>
      </form>
    </div>
EOT;

   return $formdataFreeBusiness;
}

