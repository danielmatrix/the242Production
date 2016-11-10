<?php
session_start();

function html_HelpWanted($id, $list_id, $search_display, $form_status, $email, $phone, $island_ids, $map_phone){



//id, list_id, search_display, job_title,email,phone,job_description,island_ids,map_phone 

if($form_status === 'edit'){
  extract(get_help_wanted($id));

  if($active === 'Y'){
    $active = 'checked';    
  }
  else{
    $active = '';
  }

  $formHelpWanted = <<<EOT
      <h5 class="well well-sm col-sm-offset-2 col-sm-10"><span class="text-primary">Help Wanted</span> <a id="calcelHelpWanted" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='calcelHelpWanted'><span class="text-muted"><small>Cancel</small><span></a></h5>

      <form id="formhelpWanted" class="form-horizontal" method="post" name="formhelpWanted" data-element="formhelpWanted" data-status="edit" novalidate>

        <div class="form-group form-group-sm">
          <label for="jobTitle" class="col-sm-2 control-label">Title</label>
          <div class="col-sm-10">
            <input value="$job_title" type="text" maxlength="75" class="form-control input-sm" id="jobTitle" name="jobTitle" placeholder="Job Title" data-validateMethod="productName" data-label="jobTitle" data-errorClass="text-danger" data-required="1" data-form="formhelpWanted">
          </div>
        </div>


        <div class="form-group form-group-sm">
          <label for="email" class="col-sm-2 control-label">email</label>
          <div class="col-sm-10">
            <input value="$email" type="text"  class="form-control input-sm" id="email" name="email" placeholder="Enter contact email" data-validateMethod="emailvalid" data-label="email" data-errorClass="text-danger" data-required="" data-form="formhelpWanted">
          </div>
        </div>

        <div class="form-group form-group-sm">
          <label for="phone" class="col-sm-2 control-label">Phone</label>
          <div class="col-sm-10">
            <input value="$phone" type="text"  class="form-control input-sm" id="phone" name="phone" placeholder="242-555-5555" data-validateMethod="phone" data-label="phone" data-errorClass="text-danger" data-required="1" data-form="formhelpWanted">
          </div>
        </div>                       

        <div class="form-group form-group-sm">
          <label for="job_description" class="col-sm-2 control-label">Description</label>
          <div class="col-sm-10">
            <textarea id="job_description" name="job_description" class="form-control" rows="10" data-required="1" data-validateMethod="description" data-form="formhelpWanted" data-errorClass="text-danger" data-label="job_description">$job_description</textarea>
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="active" class="col-sm-2 control-label">Active</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" class="" id="actice" name="active" data-validateMethod="" data-label="active" data-errorClass="text-danger" data-required="0" data-form="formhelpWanted" $active>
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <div class="col-sm-offset-2 col-sm-10">
            <button id="btnHelpWanted" type="submit"  class="btn btn-primary btn-xs" data-element="btnSubMitHelpWanted" data-form="formhelpWanted" data-listid="$list_id" data-island_id="$island_ids" data-map="$map_phone " data-search_display="$search_display" data-hw_id="$id" data-email="$email" data-phone="$phone">Apply</button>
          </div>
        </div>

        <div id="formhelpWantedAlert" class="alert alert-danger col-sm-offset-2 col-sm-10" role="alert">There were errors! Please check your entries.</div>
      </form>
EOT;
} 

if($form_status === 'add'){
  $id = '';
  $job_title = '';
  $job_description = '';
  $active = '';

$formHelpWanted = <<<EOT
<div class="row">
  <div class="col-md-4">
  <button id="btnGetHelpWanted" class="btn btn-primary btn-xs" data-element="btnGetHelpWantedList" data_listId="$list_id">Get Help Wanted Ads</button>
    <a class='deleteAllHelpWanted btn btn-danger btn-xs pull-right' role='menuitem' tabindex='-1' href='#' data-listId='$list_id' data-element='aDeleteAllHelpWanted'>Delete All</a>
    <ul class="list-group" id="ul_help_wanted">
    </ul>
  </div>
 

 <div class="col-md-8">
    <div id="div_HelpWanted">
      <h5 class="well well-sm col-sm-offset-2 col-sm-10"><span class="text-primary">Help Wanted</span> <a id="calcelHelpWanted" href="#" class="pull-right btn btn-default btn-xs btn-cancel" data-element='calcelHelpWanted'><span class="text-muted"><small>Cancel</small><span></a></h5>

      <form id="formhelpWanted" class="form-horizontal" method="post" name="formhelpWanted" data-element="formhelpWanted" data-status="add" novalidate>

        <div class="form-group form-group-sm">
          <label for="jobTitle" class="col-sm-2 control-label">Title</label>
          <div class="col-sm-10">
            <input value="$job_title" type="text" maxlength="75" class="form-control input-sm" id="jobTitle" name="jobTitle" placeholder="Job Title" data-validateMethod="productName" data-label="jobTitle" data-errorClass="text-danger" data-required="1" data-form="formhelpWanted">
          </div>
        </div>


        <div class="form-group form-group-sm">
          <label for="email" class="col-sm-2 control-label">email</label>
          <div class="col-sm-10">
            <input value="$email" type="text"  class="form-control input-sm" id="email" name="email" placeholder="Enter contact email" data-validateMethod="emailvalid" data-label="email" data-errorClass="text-danger" data-required="1" data-form="formhelpWanted">
          </div>
        </div>

        <div class="form-group form-group-sm">
          <label for="phone" class="col-sm-2 control-label">Phone</label>
          <div class="col-sm-10">
            <input value="$phone" type="text"  class="form-control input-sm" id="phone" name="phone" placeholder="242-555-5555" data-validateMethod="phone" data-label="phone" data-errorClass="text-danger" data-required="1" data-form="formhelpWanted">
          </div>
        </div>                       

        <div class="form-group form-group-sm">
          <label for="job_description" class="col-sm-2 control-label">Description</label>
          <div class="col-sm-10">
            <textarea id="job_description" name="job_description" class="form-control" rows="10" data-required="1" data-validateMethod="description" data-form="formhelpWanted" data-errorClass="text-danger" data-label="job_description">$job_description</textarea>
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <label for="active" class="col-sm-2 control-label">Active</label>
          <div class="col-sm-10">
            <input value="Y" type="checkbox" class="" id="actice" name="active" data-validateMethod="" data-label="active" data-errorClass="text-danger" data-required="0" data-form="formhelpWanted" $active>
          </div>
        </div> 

        <div class="form-group form-group-sm">
          <div class="col-sm-offset-2 col-sm-10">
            <button id="btnHelpWanted" type="submit"  class="btn btn-primary btn-xs" data-element="btnSubMitHelpWanted" data-form="formhelpWanted" data-listid="$list_id" data-island_id="$island_ids" data-map="$map_phone " data-search_display="$search_display" data-hw_id="$id" data-email="$email" data-phone="$phone">Apply</button>
          </div>
        </div>
        <div id="formhelpWantedAlert" class="alert alert-danger col-sm-offset-2 col-sm-10" role="alert">There were errors! Please check your entries.</div>
      </form>
    </div>
  </div>
</div>       
EOT;
}
   return $formHelpWanted;
}

